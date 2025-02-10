const BaseAI = require('./BaseAI');

class Claude3 extends BaseAI {
  constructor(requestModel, requestAuthorization, requestMessages) {
    super(requestModel, requestAuthorization, requestMessages);
    this.url = 'https://api.anthropic.com/v1/messages';
  }

  formatHeaders() {
    if (!this.headers) {
      this.headers = {
        'x-api-key': this.authorization,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      };
    }
  }

  formatBody(requestMessages) {
    if (typeof this.body !== 'object' || this.body === null) {
      this.body = {};
    }

    let formattedMessages = [];
    requestMessages.forEach((item, index) => {
      if (index === 0 && item.role === 'system') {
        let itemContent = item.content.trim();
        this.system = itemContent;
      } else if (index === 1 && item.role === 'assistant') {
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
      'max_tokens': 1024,
      'messages': this.messages,
    };
    if (this.system !== undefined && this.system !== null && this.system !== '') {
      this.body['system'] = this.system;
    }
  }
}

module.exports = Claude3;