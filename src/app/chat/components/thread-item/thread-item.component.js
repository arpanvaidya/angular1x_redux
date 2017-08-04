import template from './thread-item.html';
import _ from 'lodash';

const ThreadItemComponent = {
  bindings: {
    thread: '<',
    active: '<',
    onThreadSelected: '&'
  },
  templateUrl: template,
  controller: class ThreadItemController {
    constructor() {
    }

    $onChanges() {
      this.unreadCount = _.sumBy(this.thread.messages, (m) => m.isRead ? 0 : 1);
    }
  }
};

export default ThreadItemComponent;
