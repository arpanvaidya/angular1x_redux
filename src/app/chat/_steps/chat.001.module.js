import angular from 'angular';
import uiRouter from 'angular-ui-router';
import MatchWindowHeight from './shared/utilities/match-window-height.directive';

import ChatPageComponent from './containers/chat-page/chat-page.component';
// Other component imports

const ChatModule = angular
  .module('components.chat', [
    uiRouter
  ])
  .config(/*@ngInject*/ ($stateProvider) => {
    $stateProvider
      .state('chat', {
        url: '',
        component: 'chatPage'
      })
  })
  .directive('matchWindowHeight', MatchWindowHeight)
  .component('chatPage', ChatPageComponent);
  // other components

export default ChatModule;
