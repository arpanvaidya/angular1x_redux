import template from './message-input.html';

const MessageInputComponent = {
  bindings: {
    onSendMessage: '&'
  },
  templateUrl: template,
  controller: class MessageInputController {
    constructor() {
      this.message = '';
    }

    sendMessage(event) {
      if (event.keyCode === 13) {
        this.onSendMessage({$event: this.message});
        this.message = '';
        event.preventDefault();
      }
    }
  }
};

export default MessageInputComponent;
