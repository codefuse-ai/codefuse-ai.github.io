---
group:
  title: 图谱推理
  order: 6
title: Task Node Agent
order: 1
toc: content
---

### 该文档介绍了图谱推理的三种模式：react 模式、planning 模式、parallel 模式。

### 1. react 模式

1. 判断当前状态
   判断当前节点是否是第一次运行。

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

2. 获取节点名字 + 节点描述。

```python
oneNode = self.geabase_handler.get_current_node(attributes={"id": nodeId,}, node_type=nodeType)
oneNodeName  = oneNode.attributes['name']
oneNodeDescription  = oneNode.attributes['description']
```

3. 获取 memory，构成给大模型的输入。获取当前节点的历史运行情况。如果是第一次运行，需要将 react node 的 name 存入到 memory 中，若不是第一次运行，则获取历史记录。

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

4. 执行大模型，构建输入给大模型的 prompt，具体 prompt 可以参考 task_node_prompt 文件。

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

5. 解析大模型的执行结果并保存。

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

6. 存储 history。

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

7. 存储 memory。存储相关的 memory，若该节点执行结束，则更新变量。

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

8. 返回 question_plan。

```python
if react_flag == 'end':
    question_plan = []
elif react_flag == 'waiting_other_agent':
    question_plan = self.react_get_question_plan(sessionId, nodeId, execute_agent_name)
else:
    question_plan = []
return react_flag, question_plan
```

### 2. planning 模式

1-3 步、6-8 步与`react`模式完全一致，仅有 4、5 两步有所不同。

1. 判断当前状态
   判断当前节点是否是第一次运行。
2. 获取节点名字 + 节点描述。
3. 获取 memory，构成给大模型的输入。获取当前节点的历史运行情况。如果是第一次运行，需要将 react node 的 name 存入到 memory 中，若不是第一次运行，则获取历史记录。
4. 执行大模型，构建输入给大模型的 prompt，具体 prompt 可以参考 task_node_agent.md 文件。如果是第一次调用，获取 action plan；如果不是第一次调用，无需执行大模型，将已运行的 agent_name 存下来。如果 action_plan.data 的第一个元素为主持人，则执行主持人 agent，并移除 action_plan.data 的第一个元素.
5. 解析大模型的执行结果并保存。
6. 存储 history。
7. 存储 memory。存储相关的 memory，若该节点执行结束，则更新变量。
8. 返回 question_plan。

### 3. parallel 模式

1-3 步、6-8 步与`react`模式完全一致，仅有 4、5 两步有所不同。

1. 判断当前状态
   判断当前节点是否是第一次运行。
2. 获取节点名字 + 节点描述。
3. 获取 memory，构成给大模型的输入。获取当前节点的历史运行情况。如果是第一次运行，需要将 react node 的 name 存入到 memory 中，若不是第一次运行，则获取历史记录。
4. 执行大模型，构建输入给大模型的 prompt，具体 prompt 可以参考 task_node_agent.md 文件。如果是第一次调用，获取 action plan；如果不是第一次调用，无需执行大模型，将已运行的 agent_name 存下来。
5. 分析大模型的执行结果，如果是第一次运行，则从 action_plan 中提取 execute_agent_names，如果不是第一次运行，则根据 remain_action_plan 判断节点任务是否结束。解析大模型的执行结果并保存。
6. 存储 history。
7. 存储 memory。存储相关的 memory，若该节点执行结束，则更新变量。
8. 返回 question_plan。
