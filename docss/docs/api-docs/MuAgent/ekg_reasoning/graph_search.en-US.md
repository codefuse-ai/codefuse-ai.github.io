---
group:
  title: EKG Reasoning
  order: 6
title: Graph Search
order: 0
toc: content
---

### 1. Intention Recognition

Determine the user's intent represented by the user's input, such as 1. Casual chat mode, 2. Entering the Spy Game, 3. Entering the Werewolf Game.

```python
intention_error_flag = self.intentionRecongnitionProcess()
if intention_error_flag == 'intention_error':
    # 意图识别查询失败
    if self.queryType != 'justChat' :
        logging.info(f'意图识别查询失败, 表示没有数据，同时现在不是闲聊 需要泛化推理')

        self.memory_handler.message_save(
                sessionId = self.sessionId,
                nodeId = 'gr',
                role_content='gr',
                hashpostfix='gr',
                user_name='gr',
                role_name='gr',
                role_type='gr')

        res_to_lingsi = self.grProcess(scene = self.scene, sessionId = self.sessionId,
            currentNodeId = self.currentNodeId, algorithm_State = self.algorithm_State,
            lingsi_response= self.lingsi_response,
            geabase_handler = self.geabase_handler,
            memory_handler = self.memory_handler, llm_config = self.llm_config)
        return res_to_lingsi

    else:
        logging.info('意图识别查询失败, 表示没有数据，且现在是闲聊。直接终止')
        res_to_lingsi = {
            'intentionRecognitionSituation': self.intentionRecognitionSituation,
            "sessionId": self.sessionId,
            "type": "summary",
            "summary" :     '意图识别未检验到相关数据，且提问和已沉淀知识无关，终止',
            "toolPlan":     None ,
            "userInteraction": None,
            }
        return  res_to_lingsi
```

### 2. Memory Write

Write related memory.

```python
def memorywrite(self):
    '''
        这里的memory 需要修改为支持重复访问的情况， 此外， 检索的时候也需要修改
        对于task节点，可以memory先检索，再写入
        对于phenomenon节点， 覆盖写入？ 每次只保留一条数据？
    '''
    # 开始处理
    if self.algorithm_State == 'FIRST_INPUT':# 如果为第一次输入
        logging.info('first_user_memory_write start')
        self.first_user_memory_write()
        logging.info('first_user_memory_write over')
    # elif self.inputType in ["onlyTool", "toolAndPresentation", 'onlyToolOrUserProblem']:# tool执行结果返回
    elif  self.algorithm_State == "TOOL_EXECUTION_RESULT": # tool执行结果返回
        logging.info('当前不为第一次输入，是一个tool执行的返回， 进行memory写入')
        #1.1 先加count
        logging.info('1.1 先加count')
        self.memory_handler.tool_nodecount_add_chapter(self.sessionId, self.currentNodeId)

        user_input_memory_tag = self.gb_handler.user_input_memory_tag(self.currentNodeId, 'opsgptkg_task') #获取任务节点上的用户标注的memory tag
        #1.2 再写 task description
        logging.info('1.2 再写 task description')
        task_description = self.gb_handler.geabase_getDescription(
                self.currentNodeId,
                    'opsgptkg_task')

        self.memory_handler.tool_nodedescription_save(self.sessionId, self.currentNodeId, task_description, user_input_memory_tag)
        # 1.3 再写 observation
        logging.info('1.3 再写 observation')
        tool_infomation = self.observation

        self.memory_handler.tool_observation_save(self.sessionId, self.currentNodeId, tool_infomation, user_input_memory_tag)


    elif self.algorithm_State == "TOOL_QUESTION_RETURN_ANSWER" and self.gb_handler.geabase_is_react_node == False:  # 用户问答返回，task tool节点
            logging.info('当前不为第一次输入，是一个用户回答问题的返回， 进行memory写入')
            user_input_memory_tag = self.gb_handler.user_input_memory_tag(self.currentNodeId, 'opsgptkg_task') #获取任务节点上的用户标注的memory tag

            #1.1 先加count
            logging.info('1.1 先加count 只有对于tool task 才加')

            self.memory_handler.tool_nodecount_add_chapter(self.sessionId, self.currentNodeId)
            #1.2 再写 问用户的问题
            logging.info('1.2 再写 ask_user_question')
            ask_user_question = json.dumps(self.gb_handler.geabase_getnodequestion( rootNodeId = self.currentNodeId, rootNodeType = 'opsgptkg_task'), ensure_ascii=False)
            self.memory_handler.tool_nodedescription_save(self.sessionId, self.currentNodeId, ask_user_question, user_input_memory_tag)
            # 1.3 再写 observation
            logging.info('1.3 再写 observation')
            tool_infomation = self.userAnswer
            self.memory_handler.tool_observation_save(self.sessionId, self.currentNodeId, tool_infomation, user_input_memory_tag)


    elif self.algorithm_State == "REACT_EXECUTION_RESULT": # react 执行结果返回
        # 需要更新count，写入用户返回的memory， 写入新生成的memory。
        # 此时一定不是 最开始运行的时刻，肯定是中间等待其他agent返回结果的时刻
        # 对于结果memory的填写，放在react_running中

        pass
```

### 3. Retrieve Information of Each Node in the Subgraph

Use the function get_nodeid_in_subtree to retrieve information about each node in the subgraph.

```python
def get_nodeid_in_subtree(self, sessionId, nodeId):
    nodeid_in_subtree_memory = self.memory_manager.get_memory_pool_by_all({ "chat_index": self.sessionId, "role_type": "nodeid_in_subtree"})
    nodeid_in_subtree = json.loads( nodeid_in_subtree_memory.get_messages()[0].role_content)
    return nodeid_in_subtree
```

### 4. Execute QA

Call the qaProcess function to execute the QA module, with the input being the information of each node in the subgraph obtained in step 3.

```python
def qaProcess(self, nodeid_in_subtree):
    '''
        调用qa模块
    '''
    for i in range(len(nodeid_in_subtree)):
        start_nodeid    = nodeid_in_subtree[i]['nodeId']
        start_nodetype  = nodeid_in_subtree[i]['nodeType']
        if start_nodetype == 'opsgptkg_intent':
            break

    qce = qa_class( memory_manager = self.memory_manager,
        geabase_handler = self.geabase_handler,
        uesr_query = self.intentionData,
        start_nodeid = start_nodeid,
        start_nodetype =  'opsgptkg_intent',
        llm_config=self.llm_config
        )
    if self.queryType == 'allPlan':
        res = qce.full_link_summary()
    elif  self.queryType == 'nextStep':
        res = qce.next_step_summary()
    else:
        res = '输入为闲聊，暂不做回复'
    return res
```

### 5. Graph Diffusion

Execute the graph diffusion process, which will be detailed in geabase_nodediffusion_plus.

### 6. Output Results

Output the return results based on the results obtained from step 4 Execute QA or step 5 Graph Diffusion.
