const BaseAI = require('./BaseAI');

class Gemini extends BaseAI {
  constructor(requestModel, requestAuthorization, requestMessages) {
    super(requestModel, requestAuthorization, requestMessages);
    if (this.model === "gemini") {
      this.model = 'gemini-pro';
    }
    this.url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.authorization}`;
  }

  formatHeaders() {
    if (!this.headers) {
      this.headers = {'Content-Type': 'application/json'};
    }
  }

  formatBody(requestMessages) {
    try {
      if (typeof this.body !== 'object' || this.body === null) {
        this.body = {};
      }

      let formattedMessages = [];
      requestMessages.forEach((item, index) => {
        if (index === 0) {
          formattedMessages.push({
            'role': 'user',
            'parts': [{
              'text': item.content,
            }],
          }, {
            'role': 'model',
            'parts': [{
              'text': '好的',
            }],
          });
        } else if (index === 1 && item.role === 'assistant') {
          // 忽略掉第二条消息
        } else {
          formattedMessages.push({
            'role': (item.role === 'assistant') ? 'model' : 'user',
            'parts': [{
              'text': item.content,
            }],
          });
        }
      });

      // 添加 prompt: research in english，respond in Chinese
      formattedMessages.push({
        'role': 'user',
        'parts': [{
          'text': 'prompt: research in english，respond in Chinese',
        }],
      });

      this.messages = formattedMessages;

      if (['gemini-2.0-flash-exp', 'gemini-2.0-flash', 'gemini-2.0-pro-exp'].includes(this.model)) {
        this.body = {
          'contents': this.messages,
          "safetySettings": [
            { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE" },
            { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE" },
            { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE" },
            { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE" }
          ],
          "tools": [{ "googleSearch": {} }]
        };
      } else {
        this.body = {
          'contents': this.messages,
          "safetySettings": [
            { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE" },
            { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE" },
            { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE" },
            { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE" }
          ]
        };
      }
    } catch (error) {
      console.error('Error formatting messages:', error);
      throw error;
    }
  }

  handleResponse(responseData) {
    if (responseData.candidates && responseData.candidates.length > 0) {
      if (responseData.candidates[0].content && responseData.candidates[0].content.parts &&
          responseData.candidates[0].content.parts.length > 0) {
        return responseData.candidates[0].content.parts[0].text;
      } else {
        return `${this.model} API 返回未知错误: 无法获取有效的响应文本`;
      }
    } else if (responseData.error) {
      const errorMessage = responseData.error.message || '未知错误';
      return `${this.model} API 错误: ${errorMessage}`;
    } else {
      return `${this.model} API 返回未知错误: 无法获取有效的响应`;
    }
  }
}

module.exports = Gemini;
