import template from './thread-list.html';

const ThreadListComponent = {
  bindings: {
    name: '@',
    threads: '<',
    active: '<',
    onThreadSelected: '&'
  },
  templateUrl: template,
  controller: class ThreadListController {
    constructor() {
      console.log('this.threads', this.threads);
    }
  }
};

export default ThreadListComponent;
