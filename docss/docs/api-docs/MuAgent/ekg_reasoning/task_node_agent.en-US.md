---
group:
  title: EKG Reasoning
  order: 6
title: Task Node Agent
order: 1
toc: content
---

### This document introduces three modes of graph reasoning: react mode, planning mode, and parallel mode.

### 1. react Mode

1. Determine Current State.
   Determine if the current node is running for the first time.

```python
get_messages_res = self.memory_handler.nodecount_get(  sessionId, nodeId)
if get_messages_res == [] :
    logging.info('当前这个{sessionId} react节点 是第一次运行')
    first_run_react_flag = True
else:
    if json.loads(get_messages_res[0].role_content)['nodestage'] == 'end' :#在上一轮已经结束了，这一轮还未开始
        logging.info('当前这个{sessionId} react节点在上一轮已经结束了，这一轮还未开始，在这一轮也算是第一次执行')
        first_run_react_flag  = True
    else:
        logging.info('当前这个{sessionId} react节点 不是第一次执行')
        first_run_react_flag = False

if  first_run_react_flag == True:
    # 当react的状态是 end 或者为空的时候调用此函数，进行初始化 或者 chapter + 1
    self.memory_handler.init_react_count(sessionId, nodeId)
```

2. Retrieve Node Name + Node Description.

```python
oneNode = self.geabase_handler.get_current_node(attributes={"id": nodeId,}, node_type=nodeType)
oneNodeName  = oneNode.attributes['name']
oneNodeDescription  = oneNode.attributes['description']
```

3. Retrieve Memory. Form Input for Large Model Retrieve the historical operation of the current node. If it's the first run, the name of the react node needs to be saved in the memory; if not, historical records are retrieved.

```python
#step3.1 获取memory， 构成给大模型的输入
#获取memory， 主持人能看到的memory， 和获取tool的memory类似
assembled_memory = self.get_memory_for_dm(sessionId, nodeId)
assembled_memory = json.dumps(assembled_memory, ensure_ascii=False)
logging.info(f'assembled_memory is {assembled_memory}')
#step3.2 获取当前节点的历史运行情况。如果是第一次运行，需要将react node 的name 存入到 memory中
if first_run_react_flag == True:
    current_node_history = ''
    #第一次运行，对于react模块，只将标题放置在memory里， 因为对于react模块，description太多了，循环的情况下，很罗嗦且超过上下文
    self.memory_handler.react_nodedescription_save(sessionId, nodeId, oneNodeName)

else:
    #不是第一次运行。那么肯定历史history进来
    logging.info(f'#不是第一次运行。那么肯定历史history进来{sessionId}, {nodeId}')
    current_node_history  = self.memory_handler.react_current_history_get(sessionId, nodeId)
```

4. Execute Large Model Construct the prompt for the large model, specific prompts can be referenced in the task_node_prompt file.

```python
if '##输入##' not in oneNodeDescription:
    oneNodeDescription += REACT_RUNNING_PROMPT
logging.info("react 模式 prompt 分离完成")
oneNodeDescription = self.fill_replacements(oneNodeDescription, sessionId)
logging.info("变量替换完成")
if first_run_react_flag == True:
    llm_input = assembled_memory + '\n' + oneNodeName + '\n' + oneNodeDescription + '\n##已有步骤##\n无' + '\n##请输出下一个步骤,切记只输出一个步骤，它应该只是一个dict ##\n'
    logging.info('=============llm_input==================')
    logging.info(llm_input)
    llm_result = self.robust_call_llm_with_llmname(llm_input, nodeId)

    cnt = 0
    while 'taskend' not in llm_result and 'observation' not in llm_result and cnt < 5:
        llm_input += '##注意dict中一定得有 taskend 或者 observation 这两个参数中的一个##\n'
        llm_result = self.robust_call_llm_with_llmname(llm_input, nodeId)
        cnt += 1

    current_node_history_json = []
    llm_result_json = robust_json_loads(llm_result)
    llm_result_json = remove_duplicate_keys(llm_result_json)
    logging.info('=============llm_result==================')
    logging.info(llm_result_json)
    if type(llm_result_json)!=dict:
        llm_result_json = llm_result_json[0]
        logging.info('llm的输出应该是一个dict才对, 有时候出现[{one step}], 所以尝试选其中一个元素转换为dict')
        # raise  ValueError(f'llm的输出应该是一个dict才对 ')
    current_node_history_json.append(llm_result_json)
else:
    current_node_history_json = json.loads(current_node_history) #历史记录里可能包含虚假信息
    logging.info(f'current_node_history_json is {current_node_history_json}')
    if current_node_history_json[-1]['action']['agent_name'] != '主持人':
        current_node_history_json[-1]["observation"][0]['content'] = agent_respond #将历史中最后一次主持人幻觉的输出，转换为用户补充的输入
        try:
            current_node_history_json[-1]["thought"] = '' #在非主持人环节时，应该将thought 设置为''
        except:
            pass
    llm_input = assembled_memory + '\n' + oneNodeName + '\n' +oneNodeDescription+ '\n##已有步骤##\n' + json.dumps(current_node_history_json,ensure_ascii=False) + \
        '\n##请输出下一个步骤,切记只输出一个步骤，它应该只是一个dict ##\n'
    logging.info('=============llm_input==================')
    logging.info(llm_input)
    llm_result = self.robust_call_llm_with_llmname(llm_input, nodeId)

    cnt = 0
    while 'taskend' not in llm_result and 'observation' not in llm_result and cnt < 5:
        llm_input += '##注意dict中一定得有 taskend 或者 observation 这两个参数中的一个##\n'
        llm_result = self.robust_call_llm_with_llmname(llm_input, nodeId)
        cnt += 1

    llm_result_json = robust_json_loads(llm_result)
    llm_result_json = remove_duplicate_keys(llm_result_json)
    logging.info('=============llm_result==================')
    logging.info(llm_result_json)
    if type(llm_result_json)!=dict:
        llm_result_json = llm_result_json[0]
        logging.info('llm的输出应该是一个dict才对, 有时候出现[{one step}], 所以尝试选其中一个元素转换为dict')
        # raise  ValueError(f'llm的输出应该是一个dict才对 ')
    current_node_history_json.append(llm_result_json)

retry_llm = 0
while(( retry_llm <= 20)  and  ("taskend" not in  llm_result) and  (llm_result_json['action']['agent_name'] == '主持人' )):
    logging.info('由于是主持人发言，情况继续')

    endcheck_res = self.endcheck( nodeId, nodeType, oneNodeName, oneNodeDescription, current_node_history_json)
    if endcheck_res== False:
        logging.info('endchek没有通过，主持人发言终止, 强行将 llm_result == {"action": "taskend"}')
        llm_result = json.dumps({"action": "taskend"})
        llm_result_json = robust_json_loads(llm_result)
        current_node_history_json.append(llm_result_json)
        break



    llm_input = assembled_memory + '\n' + oneNodeName + '\n' +oneNodeDescription+ '\n##已有步骤##\n' + json.dumps(current_node_history_json,ensure_ascii=False) + \
    '\n##请输出下一个步骤,切记只输出一个步骤，它应该只是一个dict ##\n'
    logging.info('=============llm_input==================')
    logging.info(llm_input)
    llm_result = self.robust_call_llm_with_llmname(llm_input, nodeId)

    while 'taskend' not in llm_result and 'observation' not in llm_result and cnt < 5:
        llm_input += '##注意dict中一定得有 taskend 或者 observation 这两个参数中的一个##\n'
        llm_result = self.robust_call_llm_with_llmname(llm_input, nodeId)
        cnt += 1

    llm_result_json = robust_json_loads(llm_result)
    llm_result_json = remove_duplicate_keys(llm_result_json)
    logging.info('=============llm_result==================')
    logging.info(llm_result_json)
    current_node_history_json.append(llm_result_json)
    if type(llm_result_json)!=dict:
        llm_result_json = llm_result_json[0]
        logging.info('llm的输出应该是一个dict才对, 有时候出现[{one step}], 所以尝试选其中一个元素转换为dict')
        raise  ValueError(f'llm的输出应该是一个dict才对 ')
    retry_llm = retry_llm + 1
```

5. Parse and Save Large Model Execution Results.

```python
if 'taskend' in llm_result:
    react_flag = 'end'
    logging.info(f'当前为{react_flag}, 将本次节点的count设置为end ')
    self.memory_handler.nodecount_set_key(sessionId, nodeId, 'nodestage', 'end')
elif 'observation' in llm_result:
    react_flag = 'waiting_other_agent'

    logging.info(f'当前为{react_flag}, 尝试补充字符使得llm_result_truncation能转为json格式 ')

    #提取此时应该执行的agent_name
    execute_agent_name = current_node_history_json[-1]['action']['agent_name']
    execute_player_name = current_node_history_json[-1]['action']['player_name']

    #将该节点的count 设置为 runninng
    self.memory_handler.nodecount_set_key(sessionId, nodeId, 'nodestage', 'running')
```

6. Store History.

```python
logging.info(f'存储 history #  for DM')
if react_flag == 'waiting_other_agent' and first_run_react_flag == True:
    #step6.1 存储 llm_result_truncation

    self.memory_handler.react_current_history_save(sessionId, nodeId,  json.dumps(current_node_history_json ,ensure_ascii=False)  )

elif react_flag == 'waiting_other_agent' and first_run_react_flag == False:
    self.memory_handler.react_current_history_save(sessionId, nodeId, json.dumps(current_node_history_json ,ensure_ascii=False))

elif react_flag == 'end' and first_run_react_flag == True: #第一次运行就运行到结尾了

    self.memory_handler.react_current_history_save(sessionId, nodeId, json.dumps(current_node_history_json ,ensure_ascii=False))

elif react_flag == 'end' and first_run_react_flag == False: #第N次运行 运行到结尾了
    self.memory_handler.react_current_history_save(sessionId, nodeId, json.dumps(current_node_history_json ,ensure_ascii=False))
```

7. Store Memory. Store related memory, update variables if the node execution is complete.

```python
logging.info(f'存储 memory # for other agent')
if react_flag == 'waiting_other_agent' and first_run_react_flag == True:
    logging.info('#第一次运行 等待agent返回')
    self.memory_handler.react_memory_save(sessionId, nodeId,  current_node_history_json)
if react_flag == 'waiting_other_agent' and first_run_react_flag == False:
    logging.info('#第N次运行 等待agent返回')
    self.memory_handler.react_memory_save(sessionId, nodeId, current_node_history_json)

elif react_flag == 'end' and first_run_react_flag == True: #第一次运行就运行到结尾了:
    logging.info('#第一次运行就运行到结尾了:')
    self.memory_handler.react_memory_save(sessionId, nodeId,  current_node_history_json)

elif react_flag == 'end' and first_run_react_flag == False: #第N次运行 运行到结尾了
    logging.info('#第N次运行 运行到结尾了')
    self.memory_handler.react_memory_save(sessionId, nodeId, current_node_history_json)

if react_flag == 'end':
    update_flag = self.update_replacement(sessionId, nodeId)
    if update_flag:
        logging.info("变量更新成功！")
    else:
        logging.info("无变量更新或变量更新失败")
```

8. Return question_plan.

```python
if react_flag == 'end':
    question_plan = []
elif react_flag == 'waiting_other_agent':
    question_plan = self.react_get_question_plan(sessionId, nodeId, execute_agent_name)
else:
    question_plan = []
return react_flag, question_plan
```

### 2. planning Mode

Steps 1-3 and 6-8 are identical to the react mode, with only steps 4 and 5 differing.

1. Determine Current State.
   Determine if the current node is running for the first time.
2. Retrieve Node Name + Node Description.
3. Retrieve Memory. Form Input for Large Model Retrieve the historical operation of the current node. If it's the first run, the name of the react node needs to be saved in the memory; if not, historical records are retrieved.
4. Execute Large Model Construct the prompt for the large model, which can be referenced in the task_node_prompt file. If it's the first call, obtain the action plan; if not the first call, there's no need to execute the large model, instead, store the agent_name that has been run. If the first element of action_plan.data is the host, execute the host agent and remove the first element of action_plan.data.
5. Parse and Save Large Model Execution Results.
6. Store History.
7. Store Memory. Store related memory, update variables if the node execution is complete.
8. Return question_plan.

### 3. parallel Mode

Steps 1-3 and 6-8 are identical to the react mode, with only steps 4 and 5 differing.

1. Determine Current State.
   Determine if the current node is running for the first time.
2. Retrieve Node Name + Node Description.
3. Retrieve Memory. Form Input for Large Model Retrieve the historical operation of the current node. If it's the first run, the name of the react node needs to be saved in the memory; if not, historical records are retrieved.
4. Execute the large model and construct the prompt to be input into the large model, with specific prompts that can be referenced from the task_node_prompt file. If it is the first call, obtain the action plan; if it is not the first call, do not execute the large model again, instead, store the already running agent_name.
5. Analyze the execution results of the large model. If it is the first run, extract the execute_agent_names from the action_plan. If it is not the first run, determine whether the node task has ended based on the remain_action_plan. Interpret the execution results of the large model and save them.
6. Store History.
7. Store Memory. Store related memory, update variables if the node execution is complete.
8. Return question_plan.
