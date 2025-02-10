const BaseAI = require('./BaseAI');

class Qwen extends BaseAI {
  constructor(requestModel, requestAuthorization, requestMessages) {
    super(requestModel, requestAuthorization, requestMessages);
    this.url = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
  }

  formatBody(requestMessages) {
    try {
      if (typeof this.body !== 'object' || this.body === null) {
        this.body = {};
      }

      let formattedMessages = [];
      requestMessages.forEach((item, index) => {
        if (index === 0 && item.role === 'system') {
          let itemContent = item.content.trim();
          if (itemContent === "") {
            itemContent = '你是通义千问';
          }
          formattedMessages.push({
            'role': 'system',
            'content': itemContent,
          });
        } else if (index === 1 && item.role === 'assistant') {
          // 忽略掉第二条消息
        } else {
          formattedMessages.push({
            'role': item.role,
            'content': item.content,
          });
        }
      });

      this.messages = formattedMessages;

      this.body = {
        'model': this.model,
        'input': {
          'messages': this.messages,
        },
        'parameters': {},
      };
    } catch (error) {
      console.error('Error formatting messages:', error);
      throw error;
    }
  }

  handleResponse(responseData) {
    if (responseData.code) {
      const errorCode = responseData.code;
      const errorMessage = responseData.message || '未知错误';
      return `${this.model}: ${errorCode} - ${errorMessage}`;
    }
    if (responseData.errorType) {
      const errorType = responseData.errorType;
      const errorMessage2 = responseData.errorMessage || '未知错误';
      return `${this.model}: ${errorType} - ${errorMessage2}`;
    }

    if (responseData.output && responseData.output.text) {
      return responseData.output.text;
    } else {
      return `${this.model}: 无法获取有效的响应文本`;
    }
  }
}

module.exports = Qwen;