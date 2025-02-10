const BaseAI = require('./BaseAI');

class DeepSeek extends BaseAI {
  constructor(requestModel, requestAuthorization, requestMessages) {
    super(requestModel, requestAuthorization, requestMessages);
    this.url = 'https://api.deepseek.com/chat/completions';
  }
}

module.exports = DeepSeek;
