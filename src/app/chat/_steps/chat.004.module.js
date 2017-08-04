import angular from 'angular';
import uiRouter from 'angular-ui-router';
import MatchWindowHeight from './shared/utilities/match-window-height.directive';

import ChatPageComponent from './containers/chat-page/chat-page.component';
import TeamHeaderComponent from './components/team-header/team-header.component';
import ChannelHeaderComponent from './components/channel-header/channel-header.component';
import ThreadListComponent from './components/thread-list/thread-list.component';
import ThreadItemComponent from './components/thread-item/thread-item.component';

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
  .component('chatPage', ChatPageComponent)
  .component('teamHeader', TeamHeaderComponent)
  .component('channelHeader', ChannelHeaderComponent)
  .component('threadList', ThreadListComponent)
  .component('threadItem', ThreadItemComponent);

export default ChatModule;
