import template from './chat-page.html';

const ChatPageComponent = {
  bindings: {},
  templateUrl: template,
  controller: class ChatPageController {
    /* @ngInject */ 
    constructor() {
      // ... sample data here
    }
  }
};

export default ChatPageComponent;
