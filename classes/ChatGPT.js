const BaseAI = require('./BaseAI');

class ChatGPT extends BaseAI {
  constructor(requestModel, requestAuthorization, requestMessages) {
    super(requestModel, requestAuthorization, requestMessages);
    this.url = 'https://api.openai.com/v1/chat/completions';
  }
}

module.exports = ChatGPT;