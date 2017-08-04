import template from './chat-page.html';
import { getChannels, getCurrentThread, getDirectMessages } from '../../shared/threads/threads.selector';
import { getCurrentUser } from '../../shared/users/users.selector';
import { selectThread, postMessage } from '../../shared/threads/threads.actions';
import { createSampleData } from '../../../../../config/sampleData';

const ChatPageComponent = {
  bindings: {},
  templateUrl: template,
  controller: class ChatPageController {
    
    /* @ngInject */ 
    constructor($ngRedux, threadsService, $stateParams) {

      this.$ngRedux = $ngRedux;
      this.$stateParams = $stateParams;
      this.unsubscribe = $ngRedux.connect(this.mapStateToThis, threadsService, {})(this);
      const unsubscribe = $ngRedux.connect(this.mapStateToThis, threadsService, {})(this);
    }

    $onDestroy(){
      this.unsubscribe();
    }

    $onInit(){
      createSampleData(this.$ngRedux, this.$stateParams);
    }

    mapStateToThis(state){
      return {
        channels: getChannels(state),
        directMessages: getDirectMessages(state),
        activeThread: getCurrentThread(state),
        currentUsers: getCurrentUser(state)
      }
    }

   threadSelected(thread) {
      this.fetchMessages(thread);
    }

    sendMessage(messageText) {
      if(messageText.length > 0) {
        this.postMessage(
          this.activeThread,
          {
            author: this.currentUser,
            text: messageText
          }
        );
      }
    }
  }
};

export default ChatPageComponent;
