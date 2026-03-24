const BaseAI = require('./BaseAI');

class ChatGPT extends BaseAI {
  constructor(requestModel, requestAuthorization, requestMessages) {
    super(requestModel, requestAuthorization, requestMessages);
    const openaiBaseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
this.url = `${openaiBaseUrl}/chat/completions`;
  }
}

module.exports = ChatGPT;
