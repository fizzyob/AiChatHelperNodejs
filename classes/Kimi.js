const BaseAI = require('./BaseAI');

class Kimi extends BaseAI {
  constructor(requestModel, requestAuthorization, requestMessages) {
    super(requestModel, requestAuthorization, requestMessages);
    this.url = 'https://api.moonshot.cn/v1/chat/completions';
  }

  formatBody(requestMessages) {
    try {
      if (typeof this.body !== 'object' || this.body === null) {
        this.body = {};
      }

      this.body = {
        'model': this.model,
        'messages': requestMessages,
        'temperature': 0.3,
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

    if (responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message && responseData.choices[0].message.content) {
      return responseData.choices[0].message.content;
    } else {
      return `${this.model}: 无法解析响应数据`;
    }
  }
}

module.exports = Kimi;