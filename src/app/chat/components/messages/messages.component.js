import template from './messages.html';
import _ from 'lodash';
import moment from 'moment';

const MessagesComponent = {
  bindings: {
    thread: '<'
  },
  templateUrl: template,
  controller: class MessagesController {
    /* @ngInject */
    constructor($document, $timeout) {
      this.$document = $document;
      this.$timeout = $timeout;
    }

    $onChanges() {
      this.organizeThreadMessages();
      this.scrollToBottom();
    }

    scrollToBottom() {
      let scrollPane = angular.element(
        this.$document[0].querySelector('#msgs-scroller-div'))[0];
      if (scrollPane) {
        this.$timeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
      }
    }

    organizeThreadMessages() {
      let groupedMessages = _.groupBy(
        this.thread.messages,
        (m) => moment(m.sentAt).format('YYYY-MM-DD')
      );

      this.messageDays = _.keys(groupedMessages)
        .sort()
        .map(k => _.sortBy(groupedMessages[k], 'sentAt'));
    }
  }
};

export default MessagesComponent;
