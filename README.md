# 搭建各类 AI 的微信助手反向代理
only for 微信助手<br>
欢迎来到微信助手 ChatGPT 反向代理项目！<br>
原项目请移步到https://github.com/GeekinGH/AiChatHelperNodejs  
### 新增支持
- 支持配置 OpenAI-compatible 上游接口
- 支持更多 GPT-family 模型（如 gpt-5 / gpt-5.4 / gpt-5.3-codex 等）
- 其它模型未进行修改，个人有需求自行修改
## 环境变量
- `OPENAI_BASE_URL`
GPT 类模型所使用的 OpenAI-compatible 上游接口地址。
默认值：`https://api.openai.com/v1`

## 需要个人进行修改的说明
1、如果需要进行微信ID鉴权：
index.js文件中，找到 const WXID_ARRAY = [];<br>
在中括号中填入你需要授权的微信ID，支持多个微信ID，用英文引号包括，不同的ID用英文逗号隔开，最后一个ID后面不用加逗号。<br>
---如果你的微信ID是wxid_abcdefg,你就填写wxid_abcdefg,别删掉了'wxid_';<br>
---如果你的微信ID是lambous就填写lambous、开头别加‘wxid’！<br>
比如 const WXID_ARRAY = ['wxid_abcdefg','lambous','yourxxx','abdcedf'];<br>
2、端口修改：const PORT = 3003; //端口可以按需修改;<br>
3、模型接口修改：在classes/ChatGPT.js中   // https://api.openai.com/v1// 可替换为任意兼容 OpenAI API 的上游接口;<br>
$\color{red}{每次修改文件必须重新运行才能生效：}$ <br>
## 部署方法（例1panel中部署，其它方法自行转化探索）
1、1panel中根文件新建文件夹/www/wwwroot/你的文件夹，下载整个文件解压;<br>
2、选择左侧/网站/运行环境/node.js进行部署，端口默认3003，可根据需求自行修改;<br>
3、http://IP：3003（或自行反代使用）
## 使用方法
以下操作都是在“微信助手”ChatGPT中操作：
1. 将你的代理地址填写到“代理地址”栏。（http&#58;&#47;&#47;你的ip:3003）
2. “APIKey”中填写对应的API Key，在“模型”中按下表选择或填写。

| AI | APIKey | 模型 |
|-----------|-------------|-----------------|
| ChatGPT 3.5 | ChatGPT 3.5 API Key | 选择：gpt-3.5-turbo |
| ChatGPT 4 | ChatGPT 4 API Key | 选择：gpt-4 |
| GPT-4o | GPT-4o API Key | 手动输入，填写：gpt-4o |
| GPT-5 | GPT-5 API Key | 手动输入，填写：gpt-5 |
| GPT-5.1 | GPT-5.1 API Key | 手动输入，填写：gpt-5.1 |
| GPT-5.2 | GPT-5.2 API Key | 手动输入，填写：gpt-5.2 |
| GPT-5.4 | GPT-5.4 API Key | 手动输入，填写：gpt-5.4 |
| GPT-5.4-mini | GPT-5.4-mini API Key | 手动输入，填写：gpt-5.4-mini |
| GPT-5-codex | GPT-5-codex API Key | 手动输入，填写：gpt-5-codex |
| GPT-5-codex-mini | GPT-5-codex-mini API Key | 手动输入，填写：gpt-5-codex-mini |
| GPT-5.1-codex | GPT-5.1-codex API Key | 手动输入，填写：gpt-5.1-codex |
| GPT-5.1-codex-mini | GPT-5.1-codex-mini API Key | 手动输入，填写：gpt-5.1-codex-mini |
| GPT-5.1-codex-max | GPT-5.1-codex-max API Key | 手动输入，填写：gpt-5.1-codex-max |
| GPT-5.2-codex | GPT-5.2-codex API Key | 手动输入，填写：gpt-5.2-codex |
| GPT-5.3-codex | GPT-5.3-codex API Key | 手动输入，填写：gpt-5.3-codex |
| Gemini-pro 1.0 | Gemini 1.0 API Key | 手动输入，填写：gemini-pro |
| Gemini-pro 1.5 | Gemini 1.5 API Key | 手动输入，填写：gemini-1.5-pro-latest |
| Gemini Flash 1.5 | Gemini 1.5 API Key | 手动输入，填写：gemini-1.5-flash |
| Gemini Flash 2.0 | Gemini 2.0 API Key | 手动输入，填写：gemini-2.0-flash-exp |
| Gemini Flash 2.5 | Gemini 2.5 API Key | 手动输入，填写：gemini-2.5-flash |
| 通义千问 | Qwen API Key | 手动输入，填写：qwen-turbo（弃用）或 qwen-max |
| Moonshot Kimi | Kimi API Key | 手动输入，填写：moonshot-v1-8k 或 moonshot-v1-32k |
| Claude 3 | Claude 3 API Key | 手动输入，填写：claude-3-opus-20240229 |
| 360智脑 | 360 API Key | 手动输入，填写：360gpt-pro |
| DeepSeek-V3 | DeepSeek API Key | 手动输入，填写：deepseek-chat |
| DeepSeek-R1 | DeepSeek API Key | 手动输入，填写：deepseek-reasoner |

3. 360AI 支持文生图功能，在聊天中，话术为：`画xxxxxxxx`，AI 会返回一个图片链接。
例如：`画一个蓝天白云的图片`

4. DeepSeek-R1 因为 WeChat 的字数限制，删除了推理过程，直接输出结果。
DeepSeek 也可以不通过本项目反代，直接使用 API 地址：`https://api.deepseek.com`


## 其他事项
- 部分代码参考了懒猫提供的Gemini.zip，[懒猫插件交流](https://t.me/maogroup)
- 有关微信助手ChatGPT相关功能使用，请查看微信助手中的详细使用说明，或者在交流群里交流。


