class BaseAI {
  constructor(requestModel, requestAuthorization, requestMessages) {
    this.model = requestModel;
    this.authorization = requestAuthorization;
    this.url = '';
    this.formatHeaders();
    try {
      this.formatBody(requestMessages);
    } catch (error) {
      console.error('Error formatting body:', error);
      throw error;
    }
  }

  formatHeaders() {
    if (!this.headers) {
      this.headers = {
        'Content-Type': 'application/json',
        'Authorization': this.authorization,
      };
    }
  }

  formatBody(requestMessages) {
    if (typeof this.body !== 'object' || this.body === null) {
      this.body = {};
    }
    this.body = {
      'model': this.model,
      'messages': requestMessages,
    };
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

module.exports = BaseAI;