const BaseAI = require('./BaseAI');

class GPT360 extends BaseAI {
  constructor(requestModel, requestAuthorization, requestMessages) {
    super(requestModel, requestAuthorization, requestMessages);
    this.url = 'https://api.360.cn/v1/chat/completions';
    this.text2img = false;
    try {
      // 获取最后一条消息
      const lastMessage = requestMessages[requestMessages.length - 1].content.trim();
      // 判断是否需要文生图模式
      if (lastMessage.startsWith('画')) {
        this.url = 'https://api.360.cn/v1/images/text2img';
        this.model = '360CV_S0_V5';
        this.text2img = true;
        this.formatBodyText2Img(lastMessage);
      } else {
        this.formatBody(requestMessages);
      }
    } catch (error) {
      console.error('Error formatting body:', error);
      throw error;
    }
  }

  formatBody(requestMessages) {
    try {
      if (typeof this.body !== 'object' || this.body === null) {
        this.body = {};
      }

      this.body = {
        'model': this.model,
        'messages': requestMessages,
        'stream': false,
        "tools": [
          {
            "type": "web_search",
            "web_search": {
              "search_mode": "auto",
              "search_query": requestMessages[requestMessages.length - 1].content.trim()
            }
          }
        ]
      };
    } catch (error) {
      console.error('Error formatting messages:', error);
      throw error;
    }
  }

  formatBodyText2Img(lastMessage) {
    try {
      if (typeof this.body !== 'object' || this.body === null) {
        this.body = {};
      }

      this.body = {
        "model": "360CV_S0_V5",
        "style": "realistic",
        "prompt": lastMessage.substring(1),
        "negative_prompt": "",
        "guidance_scale": 15,
        "height": 1920,
        "width": 1080,
        "num_inference_steps": 50,
        "samples": 1,
        "enhance_prompt": true
      };
    } catch (error) {
      console.error('Error formatting messages:', error);
      throw error;
    }
  }

  handleResponse(responseData) {
    if (responseData.error) {
      const errorMessage = responseData.error.message || '未知错误';
      return `${this.model}: ${errorMessage}`;
    }

    if (!this.text2img) {
      if (responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message && responseData.choices[0].message.content) {
        return responseData.choices[0].message.content;
      } else {
        return `${this.model}: 无法解析响应数据`;
      }
    } else {
      if (responseData.status === 'success' && responseData.output) {
        if (responseData.output.length > 0) {
          return responseData.output[0];
        } else {
          return '鉴于关键词过滤原因，无法根据您的关键词生图';
        }
      } else {
        return `${this.model}: 无法解析响应数据`;
      }
    }
  }
}

module.exports = GPT360;