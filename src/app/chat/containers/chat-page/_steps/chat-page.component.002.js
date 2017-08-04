import template from './chat-page.html';

const ChatPageComponent = {
  bindings: {},
  templateUrl: template,
  controller: class ChatPageController {
    /* @ngInject */ 
    constructor() {

      const eigenjoy = {
        id: 'eigenjoy',
        name: 'eigenjoy'
      };

      this.currentUser = eigenjoy;
    }
  }
};

export default ChatPageComponent;
