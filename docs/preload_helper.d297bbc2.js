!function(){"use strict";var t="/".replace(/([^/])$/,"$1/"),e=location.pathname,n=e.startsWith(t)&&decodeURI("/".concat(e.slice(t.length)));if(n){var a=document,c=a.head,r=a.createElement.bind(a),i=function(t,e,n){var a,c=e.r[t]||(null===(a=Object.entries(e.r).find((function(e){var n=e[0];return new RegExp("^".concat(n.replace(/\/:[^/]+/g,"/[^/]+").replace("/*","/.+"),"$")).test(t)})))||void 0===a?void 0:a[1]);return null==c?void 0:c.map((function(t){var a=e.f[t][1],c=e.f[t][0];return{type:c.split(".").pop(),url:"".concat(n.publicPath).concat(c),attrs:[["data-".concat(e.b),"".concat(e.p,":").concat(a)]]}}))}(n,{"p":"CodeFuse-Docs","b":"webpack","f":[["docs__blogs__blogs.zh-CN.md.126f8b97.async.js",15],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__tool_learning_evalution.en-US.md.7d8b437e.async.js",102],["docs__blogDetails__20241111.en-US.md.e3536fd8.async.js",309],["docs__docs__developer-docs__MFTCoder__main__introduction.en-US.md.9e82e5c7.async.js",338],["docs__docs__api-docs__MuAgent__overview__quick-start.zh-CN.md.04b39cf5.async.js",360],["dumi__theme__layouts__DocLayout__index.491dfd37.chunk.css",367],["dumi__theme__layouts__DocLayout__index.68cf8e7b.async.js",367],["docs__blogDetails__20231220.zh-CN.md.b2b4305a.async.js",368],["docs__contribution__pr.en-US.md.542f18b7.async.js",389],["docs__docs__api-docs__MuAgent__connector__customed_examples.en-US.md.ababe456.async.js",411],["docs__docs__developer-docs__CodeFuse-ChatBot__master__codefusechatbot.zh-CN.md.e76be929.async.js",415],["docs__blogDetails__20240807.en-US.md.50c434bb.async.js",442],["docs__publication__publication.en-US.md.199743e4.async.js",459],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__tool_learning_evalution.zh-CN.md.e7c6076b.async.js",508],["docs__docs__developer-docs__CodeFuse-Query__main__user_case.en-US.md.08195c28.async.js",622],["docs__aboutDocs__aboutdocs.en-US.md.a96833cb.async.js",631],["docs__docs__developer-docs__CodeFuse-ModelCache__main__quickstart.en-US.md.f366cc37.async.js",761],["docs__docs__api-docs__MuAgent__overview__agent-flow.en-US.md.65d0feb1.async.js",784],["docs__docs__api-docs__MuAgent__tools__custom_tool.zh-CN.md.24bfc674.async.js",850],["docs__blogDetails__20240119.en-US.md.c219010a.async.js",877],["docs__docs__developer-docs__CodeFuse-ChatBot__master__roadmap.zh-CN.md.b612b267.async.js",970],["docs__docs__api-docs__MuAgent__connector__connector_tbasememory.en-US.md.7a4fc035.async.js",981],["nm__dumi__dist__client__pages__Demo__index.578aa5c0.chunk.css",1009],["nm__dumi__dist__client__pages__Demo__index.c822a051.async.js",1009],["docs__docs__developer-docs__CodeFuse-ChatBot__master__fastchat.en-US.md.b346fa40.async.js",1095],["docs__contribution__contribution.zh-CN.md.0d555a3e.async.js",1112],["docs__docs__api-docs__MuAgent__connector__connector_localmemory.zh-CN.md.5ece070c.async.js",1323],["docs__docs__developer-docs__CodeFuse-Query__main__introduction.zh-CN.md.8987a92a.async.js",1346],["docs__docs__api-docs__MuAgent__connector__connector_prompt.zh-CN.md.29d29536.async.js",1357],["docs__docs__api-docs__MuAgent__llm_models__embedding_config.zh-CN.md.2df11220.async.js",1481],["docs__contribution__pr.zh-CN.md.88f6bb71.async.js",1531],["docs__docs__developer-docs__CodeFuse-Query__main__install_and_run.zh-CN.md.a5c4ffc5.async.js",1699],["docs__docs__developer-docs__CodeFuse-ChatBot__master__quickstart.zh-CN.md.e25f9d07.async.js",1726],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__categroy_mapping.md.0e3549dc.async.js",1742],["docs__docs__developer-docs__MFTCoder__main__quickstart.en-US.md.6d80a8b4.async.js",1774],["docs__docs__developer-docs__MFTCoder__main__accelerate.zh-CN.md.6025f4d6.async.js",1836],["docs__docs__developer-docs__CodeFuse-ModelCache__main__config.zh-CN.md.425054b2.async.js",1869],["docs__docs__developer-docs__CodeFuse-DevOps-Model__main__traindetail.en-US.md.02c1f31b.async.js",1923],["docs__docs__developer-docs__CodeFuse-ChatBot__master__start-detail.en-US.md.21260153.async.js",1927],["docs__docs__api-docs__MuAgent__connector__connector_chain.en-US.md.fec3f082.async.js",2024],["docs__docs__developer-docs__CodeFuse-Query__main__godelscript_language.en-US.md.823d735e.async.js",2053],["docs__docs__api-docs__MuAgent__connector__connector_localmemory.en-US.md.ab2605f5.async.js",2096],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__tutorial.zh-CN.md.cb0a2e61.async.js",2121],["docs__blogDetails__20240614.en-US.md.79d4a789.async.js",2468],["docs__blogDetails__20240423.en-US.md.517b9453.async.js",2477],["docs__docs__developer-docs__CodeFuse-ChatBot__master__roadmap.en-US.md.d706c34c.async.js",2483],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__data.zh-CN.md.558ffa29.async.js",2533],["docs__docs__api-docs__MuAgent__llm_models__embedding_config.en-US.md.2d7655b7.async.js",2582],["docs__blogDetails__20231211.en-US.md.af940248.async.js",2638],["docs__blogDetails__20231101.zh-CN.md.cb8ef965.async.js",2674],["docs__docs__developer-docs__CodeFuse-ModelCache__main__release_note.zh-CN.md.0510af80.async.js",2768],["docs__docs__api-docs__MuAgent__retrieval__custom_retrieval.en-US.md.076e5c24.async.js",2825],["docs__docs__developer-docs__CodeFuse-Query__main__introduction.en-US.md.6654d28d.async.js",2867],["docs__docs__developer-docs__MFTCoder__main__MFTCoder.en-US.md.27fea338.async.js",2894],["docs__docs__developer-docs__MFTCoder__main__atorch.zh-CN.md.7c6c9cb0.async.js",3013],["docs__index.en-US.md.cececbb0.async.js",3039],["docs__blogDetails__20231211.zh-CN.md.8e54f4e9.async.js",3059],["nm__dumi__dist__client__pages__404.8b85f2d9.chunk.css",3065],["nm__dumi__dist__client__pages__404.d232ceaa.async.js",3065],["docs__docs__developer-docs__CodeFuse-DevOps-Model__main__quickstart.zh-CN.md.faee3325.async.js",3271],["docs__docs__developer-docs__Test-Agent__main__quickstart.en-US.md.4ef2aac4.async.js",3304],["dumi__tmp-production__dumi__theme__ContextWrapper.875dc224.async.js",3444],["docs__docs__developer-docs__MFTCoder__main__atorch.en-US.md.d3199f3b.async.js",3487],["docs__docs__developer-docs__CodeFuse-Query__main__user_case.zh-CN.md.80369545.async.js",3531],["docs__docs__developer-docs__MFTCoder__main__MFTCoder.zh-CN.md.c44fffb6.async.js",3548],["docs__docs__developer-docs__CodeFuse-Query__main__install_and_run.en-US.md.b6ce4856.async.js",3607],["docs__blogDetails__001.en-US.md.f7856f51.async.js",3724],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__data.en-US.md.13115d2b.async.js",3841],["docs__docs__api-docs__MuAgent__connector__connector_phase.en-US.md.cdee2935.async.js",3907],["4078.e3dba83b.async.js",4078],["docs__docs__developer-docs__CodeFuse-evalution__main__quickstart.zh-CN.md.89a4242d.async.js",4090],["docs__docs__developer-docs__CodeFuse-DevOps-Model__main__codefuseDevopsModel.zh-CN.md.dff2fe4d.async.js",4096],["docs__blogDetails__20240914.en-US.md.72ef6685.async.js",4143],["docs__docs__developer-docs__CodeFuse-DevOps-Model__main__codefuseDevopsModel.en-US.md.7bad8757.async.js",4163],["docs__docs__developer-docs__CodeFuse-ModelCache__main__feature.zh-CN.md.529d9721.async.js",4192],["docs__blogDetails__20240706.zh-CN.md.9fd95cd6.async.js",4213],["docs__docs__api-docs__MuAgent__connector__connector_memory.en-US.md.c9ac2e28.async.js",4280],["docs__docs__developer-docs__CodeFuse-MFT-VLM__main__quickstart.zh-CN.md.ef7a348a.async.js",4323],["docs__blogDetails__20240805.en-US.md.55598f19.async.js",4405],["docs__blogDetails__20240706.en-US.md.1d735cc3.async.js",4433],["docs__docs__developer-docs__MFTCoder__main__introduction.zh-CN.md.43f846d2.async.js",4517],["docs__blogDetails__20240807.zh-CN.md.20cd97cb.async.js",4525],["docs__blogDetails__20240119.zh-CN.md.29fb9c30.async.js",4540],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__tool_learning_info_zh.en-US.md.871ae67c.async.js",4633],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__codefuseDevopsEval.en-US.md.fae97f6c.async.js",4638],["docs__blogDetails__20240123.zh-CN.md.cee344aa.async.js",4721],["docs__docs__api-docs__MuAgent__tools__custom_tool.en-US.md.533c2a5d.async.js",4729],["docs__blogDetails__20240914.zh-CN.md.a7e4394a.async.js",4773],["docs__docs__api-docs__MuAgent__overview__multi-agent.zh-CN.md.ef333f0c.async.js",4818],["docs__docs__developer-docs__CodeFuse-DevOps-Model__main__quickstart.en-US.md.b2f0d906.async.js",4897],["docs__docs__developer-docs__CodeFuse-ModelCache__main__CodeFuseModelCache.zh-CN.md.946832d4.async.js",5087],["docs__contribution__acknowledgements.zh-CN.md.1a574757.async.js",5135],["docs__blogDetails__20240703.en-US.md.5cf41c69.async.js",5270],["docs__blogDetails__20240820.en-US.md.e21afa28.async.js",5275],["docs__docs__developer-docs__CodeFuse-evalution__main__codefuse-evalution.zh-CN.md.f0dd9ef5.async.js",5303],["docs__docs__developer-docs__CodeFuse-Query__main__CodeFuseQuery.zh-CN.md.7e7b303a.async.js",5370],["docs__blogDetails__20240705.zh-CN.md.3d0990d0.async.js",5374],["docs__docs__developer-docs__CodeFuse-Query__main__CodeFuseQuery.en-US.md.a61c8e45.async.js",5503],["docs__docs__developer-docs__MFTCoder__main__accelerate.en-US.md.ec18f690.async.js",5559],["docs__docs__api-docs__MuAgent__connector__connector_tbasememory.zh-CN.md.15ec83eb.async.js",5562],["docs__blogs__blogs.en-US.md.e81ec1b2.async.js",5657],["docs__docs__developer-docs__CodeFuse-ModelCache__main__config.en-US.md.62bc81ba.async.js",5669],["docs__docs__developer-docs__CodeFuse-ChatBot__master__start-detail.zh-CN.md.cdcaf2d6.async.js",5680],["docs__docs__api-docs__MuAgent__llm_models__llm_config.zh-CN.md.ccdd86cd.async.js",5830],["docs__docs__developer-docs__CodeFuse-Query__main__toolchain.zh-CN.md.8f2b033f.async.js",5847],["docs__docs__developer-docs__Test-Agent__main__TestAgent.zh-CN.md.7157e7da.async.js",5889],["docs__docs__developer-docs__CodeFuse-ChatBot__master__fastchat.zh-CN.md.592194ec.async.js",5900],["docs__docs__developer-docs__CodeFuse-ModelCache__main__quickstart.zh-CN.md.98a3e55c.async.js",6017],["docs__docs__developer-docs__CodeFuse-Query__main__godelscript_language.zh-CN.md.ac5a4608.async.js",6104],["docs__docs__api-docs__MuAgent__connector__connector_chain.zh-CN.md.cce17f17.async.js",6132],["docs__blogDetails__20240703.zh-CN.md.16ae4ef9.async.js",6148],["docs__blogDetails__blogDetails.en-US.md.61b50389.async.js",6176],["docs__docs__api-docs__MuAgent__llm_models__llm_config.en-US.md.a8bc3e32.async.js",6187],["docs__docs__api-docs__MuAgent__connector__connector_phase.zh-CN.md.42a59dcf.async.js",6222],["docs__docs__api-docs__MuAgent__overview__quick-start.en-US.md.d8d5b5e1.async.js",6227],["docs__docs__api-docs__MuAgent__connector__customed_examples.zh-CN.md.a498f5e5.async.js",6339],["docs__docs__about__overview.zh-CN.md.adb4886c.async.js",6393],["docs__docs__developer-docs__CodeFuse-MFT-VLM__main__mftvlm.zh-CN.md.08bbe55b.async.js",6433],["docs__contribution__issue.zh-CN.md.0d40521d.async.js",6459],["docs__docs__developer-docs__CodeFuse-evalution__main__codefuse-evalution.en-US.md.b7a62bff.async.js",6576],["docs__docs__developer-docs__MFTCoder__main__quickstart.zh-CN.md.2c7d6afb.async.js",6604],["docs__docs__developer-docs__CodeFuse-DevOps-Model__main__traindetail.zh-CN.md.1e004612.async.js",6727],["docs__docs__api-docs__MuAgent__connector__connector_prompt.en-US.md.0496d2c5.async.js",6760],["docs__docs__developer-docs__CodeFuse-evalution__main__quickstart.en-US.md.79cb4c01.async.js",6794],["docs__publication__publication.zh-CN.md.9db686bb.async.js",6817],["docs__docs__api-docs__MuAgent__connector__connector_agent.zh-CN.md.4509812f.async.js",6827],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__tool_learning_info_zh.zh-CN.md.e31e9cfe.async.js",6889],["docs__blogDetails__20240705.en-US.md.bbafb41f.async.js",6989],["docs__docs__developer-docs__CodeFuse-ModelCache__main__feature.en-US.md.26cbdd6a.async.js",7005],["docs__docs__developer-docs__CodeFuse-ModelCache__main__release_note.en-US.md.9118cc29.async.js",7099],["docs__blogDetails__20240805.zh-CN.md.bf1d7f90.async.js",7114],["docs__docs__api-docs__MuAgent__connector__connector_memory.zh-CN.md.453fadbd.async.js",7223],["docs__docs__api-docs__MuAgent__overview__multi-agent.en-US.md.9c3353de.async.js",7297],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__evaluate.en-US.md.47a79af8.async.js",7365],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__evaluate.zh-CN.md.71f976a6.async.js",7536],["docs__docs__developer-docs__CodeFuse-ChatBot__master__quickstart.en-US.md.a50c845d.async.js",7568],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__tutorial.en-US.md.19680d5e.async.js",7570],["docs__blogDetails__blogDeatils.zh-CN.md.ce34c551.async.js",7658],["docs__docs__api-docs__MuAgent__overview__agent-flow.zh-CN.md.5e309171.async.js",7803],["docs__contribution__contribution.en-US.md.8818e7cf.async.js",7834],["docs__docs__developer-docs__CodeFuse-ChatBot__master__codefusechatbot.en-US.md.05f1fc16.async.js",8057],["docs__blogDetails__20240614.zh-CN.md.9641f7f8.async.js",8077],["docs__contribution__acknowledgements.en-US.md.ac6e5ad1.async.js",8083],["docs__blogDetails__20231101.en-US.md.c091f3c2.async.js",8165],["docs__docs__developer-docs__CodeFuse-ModelCache__main__CodeFuseModelCache.en-US.md.7f6c8112.async.js",8366],["docs__contribution__issue.en-US.md.a10da239.async.js",8618],["docs__blogDetails__20240423.zh-CN.md.af9ebe0d.async.js",8663],["docs__aboutDocs__aboutdocs.zh-CN.md.bd9809c7.async.js",8756],["docs__index.zh-CN.md.4b3c9bde.async.js",8834],["docs__blogDetails__20241111.zh-CN.md.603178f3.async.js",8882],["docs__docs__about__overview.en-US.md.296364f9.async.js",8887],["docs__docs__api-docs__MuAgent__connector__connector_agent.en-US.md.4e529ca2.async.js",9026],["docs__docs__developer-docs__CodeFuse-MFT-VLM__main__mftvlm.en-US.md.5d799a2c.async.js",9175],["docs__blogDetails__20231220.en-US.md.ea6976de.async.js",9198],["docs__blogDetails__20240820.zh-CN.md.c80cfd2d.async.js",9206],["docs__docs__developer-docs__Test-Agent__main__quickstart.zh-CN.md.d6364f26.async.js",9332],["docs__docs__developer-docs__Test-Agent__main__TestAgent.en-US.md.6d35be20.async.js",9507],["docs__docs__developer-docs__CodeFuse-Query__main__toolchain.en-US.md.9f19f77e.async.js",9508],["docs__docs__developer-docs__CodeFuse-MFT-VLM__main__quickstart.en-US.md.9410cf75.async.js",9597],["docs__docs__api-docs__MuAgent__retrieval__custom_retrieval.zh-CN.md.3546abdf.async.js",9715],["docs__docs__developer-docs__CodeFuse-DevOps-Eval__master__codefuseDevopsEval.zh-CN.md.49a68719.async.js",9900],["docs__blogDetails__20240123.en-US.md.e45a36fe.async.js",9903],["docs__blogDetails__001.zh-CN.md.f2ddcf98.async.js",9966]],"r":{"/*":[57,58,5,6,69,61],"/":[55,5,6,69,61],"/zh-CN/":[148,5,6,69,61],"/~demos/:id":[22,23,61],"/contribution/acknowledgements":[142,5,6,69,61],"/contribution/contribution":[139,5,6,69,61],"/blogDetails/blogDetails":[111,5,6,69,61],"/publication/publication":[12,5,6,69,61],"/blogDetails/20231101":[143,5,6,69,61],"/blogDetails/20231211":[48,5,6,69,61],"/blogDetails/20231220":[153,5,6,69,61],"/blogDetails/20240119":[19,5,6,69,61],"/blogDetails/20240123":[161,5,6,69,61],"/blogDetails/20240423":[44,5,6,69,61],"/blogDetails/20240614":[43,5,6,69,61],"/blogDetails/20240703":[92,5,6,69,61],"/blogDetails/20240705":[127,5,6,69,61],"/blogDetails/20240706":[79,5,6,69,61],"/blogDetails/20240805":[78,5,6,69,61],"/blogDetails/20240807":[11,5,6,69,61],"/blogDetails/20240820":[93,5,6,69,61],"/blogDetails/20240914":[72,5,6,69,61],"/blogDetails/20241111":[2,5,6,69,61],"/aboutDocs/aboutdocs":[15,5,6,69,61],"/contribution/issue":[145,5,6,69,61],"/blogDetails/001":[66,5,6,69,61],"/contribution/pr":[8,5,6,69,61],"/blogs/blogs":[100,5,6,69,61],"/zh-CN/contribution/acknowledgements":[91,5,6,69,61],"/zh-CN/contribution/contribution":[25,5,6,69,61],"/zh-CN/blogDetails/blogDeatils":[137,5,6,69,61],"/zh-CN/publication/publication":[124,5,6,69,61],"/zh-CN/blogDetails/20231101":[49,5,6,69,61],"/zh-CN/blogDetails/20231211":[56,5,6,69,61],"/zh-CN/blogDetails/20231220":[7,5,6,69,61],"/zh-CN/blogDetails/20240119":[82,5,6,69,61],"/zh-CN/blogDetails/20240123":[85,5,6,69,61],"/zh-CN/blogDetails/20240423":[146,5,6,69,61],"/zh-CN/blogDetails/20240614":[141,5,6,69,61],"/zh-CN/blogDetails/20240703":[110,5,6,69,61],"/zh-CN/blogDetails/20240705":[96,5,6,69,61],"/zh-CN/blogDetails/20240706":[75,5,6,69,61],"/zh-CN/blogDetails/20240805":[130,5,6,69,61],"/zh-CN/blogDetails/20240807":[81,5,6,69,61],"/zh-CN/blogDetails/20240820":[154,5,6,69,61],"/zh-CN/blogDetails/20240914":[87,5,6,69,61],"/zh-CN/blogDetails/20241111":[149,5,6,69,61],"/zh-CN/aboutDocs/aboutdocs":[147,5,6,69,61],"/docs/about/overview":[150,5,6,69,61],"/zh-CN/contribution/issue":[118,5,6,69,61],"/zh-CN/blogDetails/001":[162,5,6,69,61],"/zh-CN/contribution/pr":[30,5,6,69,61],"/zh-CN/blogs/blogs":[0,5,6,69,61],"/zh-CN/docs/about/overview":[116,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Eval/master/tool_learning_evalution":[1,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Eval/master/tool_learning_info_zh":[83,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Eval/master/codefuseDevopsEval":[84,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Model/main/codefuseDevopsModel":[73,5,6,69,61],"/docs/developer-docs/CodeFuse-ModelCache/main/CodeFuseModelCache":[144,5,6,69,61],"/docs/developer-docs/CodeFuse-evalution/main/codefuse-evalution":[119,5,6,69,61],"/docs/developer-docs/CodeFuse-Query/main/godelscript_language":[40,5,6,69,61],"/docs/developer-docs/CodeFuse-ChatBot/master/codefusechatbot":[140,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Eval/master/categroy_mapping":[33,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Model/main/traindetail":[37,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Model/main/quickstart":[89,5,6,69,61],"/docs/developer-docs/CodeFuse-ModelCache/main/release_note":[129,5,6,69,61],"/docs/developer-docs/CodeFuse-ChatBot/master/start-detail":[38,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Eval/master/evaluate":[133,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Eval/master/tutorial":[136,5,6,69,61],"/docs/developer-docs/CodeFuse-ModelCache/main/quickstart":[16,5,6,69,61],"/docs/developer-docs/CodeFuse-Query/main/install_and_run":[65,5,6,69,61],"/docs/developer-docs/CodeFuse-ChatBot/master/quickstart":[135,5,6,69,61],"/docs/developer-docs/CodeFuse-evalution/main/quickstart":[123,5,6,69,61],"/docs/api-docs/MuAgent/connector/connector_localmemory":[41,5,6,69,61],"/docs/api-docs/MuAgent/connector/connector_tbasememory":[21,5,6,69,61],"/docs/developer-docs/CodeFuse-Query/main/CodeFuseQuery":[97,5,6,69,61],"/docs/developer-docs/CodeFuse-ChatBot/master/fastchat":[24,5,6,69,61],"/docs/developer-docs/CodeFuse-DevOps-Eval/master/data":[67,5,6,69,61],"/docs/developer-docs/CodeFuse-MFT-VLM/main/quickstart":[158,5,6,69,61],"/docs/developer-docs/CodeFuse-ModelCache/main/feature":[128,5,6,69,61],"/docs/developer-docs/CodeFuse-Query/main/introduction":[52,5,6,69,61],"/docs/developer-docs/CodeFuse-ChatBot/master/roadmap":[45,5,6,69,61],"/docs/developer-docs/CodeFuse-ModelCache/main/config":[101,5,6,69,61],"/docs/api-docs/MuAgent/connector/customed_examples":[9,5,6,69,61],"/docs/api-docs/MuAgent/llm_models/embedding_config":[47,5,6,69,61],"/docs/developer-docs/CodeFuse-Query/main/toolchain":[157,5,6,69,61],"/docs/developer-docs/CodeFuse-Query/main/user_case":[14,5,6,69,61],"/docs/api-docs/MuAgent/connector/connector_memory":[76,5,6,69,61],"/docs/api-docs/MuAgent/connector/connector_prompt":[122,5,6,69,61],"/docs/api-docs/MuAgent/retrieval/custom_retrieval":[51,5,6,69,61],"/docs/developer-docs/CodeFuse-MFT-VLM/main/mftvlm":[152,5,6,69,61],"/docs/api-docs/MuAgent/connector/connector_agent":[151,5,6,69,61],"/docs/api-docs/MuAgent/connector/connector_chain":[39,5,6,69,61],"/docs/api-docs/MuAgent/connector/connector_phase":[68,5,6,69,61],"/docs/developer-docs/MFTCoder/main/introduction":[3,5,6,69,61],"/docs/developer-docs/Test-Agent/main/quickstart":[60,5,6,69,61],"/docs/developer-docs/Test-Agent/main/TestAgent":[156,5,6,69,61],"/docs/developer-docs/MFTCoder/main/accelerate":[98,5,6,69,61],"/docs/developer-docs/MFTCoder/main/quickstart":[34,5,6,69,61],"/docs/api-docs/MuAgent/llm_models/llm_config":[112,5,6,69,61],"/docs/api-docs/MuAgent/overview/multi-agent":[132,5,6,69,61],"/docs/api-docs/MuAgent/overview/quick-start":[114,5,6,69,61],"/docs/developer-docs/MFTCoder/main/MFTCoder":[53,5,6,69,61],"/docs/api-docs/MuAgent/overview/agent-flow":[17,5,6,69,61],"/docs/developer-docs/MFTCoder/main/atorch":[62,5,6,69,61],"/docs/api-docs/MuAgent/tools/custom_tool":[86,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-DevOps-Eval/master/tool_learning_evalution":[13,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-DevOps-Eval/master/tool_learning_info_zh":[126,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-DevOps-Eval/master/codefuseDevopsEval":[160,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-DevOps-Model/main/codefuseDevopsModel":[71,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ModelCache/main/CodeFuseModelCache":[90,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-evalution/main/codefuse-evalution":[94,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-Query/main/godelscript_language":[108,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/codefusechatbot":[10,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-DevOps-Model/main/traindetail":[121,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-DevOps-Model/main/quickstart":[59,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ModelCache/main/release_note":[50,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/start-detail":[102,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-DevOps-Eval/master/evaluate":[134,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-DevOps-Eval/master/tutorial":[42,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ModelCache/main/quickstart":[107,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-Query/main/install_and_run":[31,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/quickstart":[32,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-evalution/main/quickstart":[70,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/connector/connector_localmemory":[26,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/connector/connector_tbasememory":[99,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-Query/main/CodeFuseQuery":[95,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/fastchat":[106,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-DevOps-Eval/master/data":[46,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-MFT-VLM/main/quickstart":[77,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ModelCache/main/feature":[74,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-Query/main/introduction":[27,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/roadmap":[20,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-ModelCache/main/config":[36,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/connector/customed_examples":[115,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/llm_models/embedding_config":[29,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-Query/main/toolchain":[104,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-Query/main/user_case":[63,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/connector/connector_memory":[131,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/connector/connector_prompt":[28,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/retrieval/custom_retrieval":[159,5,6,69,61],"/zh-CN/docs/developer-docs/CodeFuse-MFT-VLM/main/mftvlm":[117,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/connector/connector_agent":[125,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/connector/connector_chain":[109,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/connector/connector_phase":[113,5,6,69,61],"/zh-CN/docs/developer-docs/MFTCoder/main/introduction":[80,5,6,69,61],"/zh-CN/docs/developer-docs/Test-Agent/main/quickstart":[155,5,6,69,61],"/zh-CN/docs/developer-docs/Test-Agent/main/TestAgent":[105,5,6,69,61],"/zh-CN/docs/developer-docs/MFTCoder/main/accelerate":[35,5,6,69,61],"/zh-CN/docs/developer-docs/MFTCoder/main/quickstart":[120,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/llm_models/llm_config":[103,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/overview/multi-agent":[88,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/overview/quick-start":[4,5,6,69,61],"/zh-CN/docs/developer-docs/MFTCoder/main/MFTCoder":[64,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/overview/agent-flow":[138,5,6,69,61],"/zh-CN/docs/developer-docs/MFTCoder/main/atorch":[54,5,6,69,61],"/zh-CN/docs/api-docs/MuAgent/tools/custom_tool":[18,5,6,69,61]}},{publicPath:"/"});null==i||i.forEach((function(t){var e,n=t.type,a=t.url;if("js"===n)(e=r("script")).src=a,e.async=!0;else{if("css"!==n)return;(e=r("link")).href=a,e.rel="preload",e.as="style"}t.attrs.forEach((function(t){e.setAttribute(t[0],t[1]||"")})),c.appendChild(e)}))}}();