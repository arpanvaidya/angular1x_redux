import template from './message.html';

const MessageComponent = {
  bindings: {
    message: '<',
    deleteMessage: '&'
  },
  templateUrl: template
};

export default MessageComponent;
