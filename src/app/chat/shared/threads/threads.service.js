import { getMessagesRequest, selectThread, postMessageRequest, addMessage } from './threads.actions';
import { uuid } from '../../../..//app/chat/shared/utilities/util';

/* @ngInject */
export default function ThreadsService($http) {
    const fetchMessages = thread => dispatch => {
        dispatch(getMessagesRequest(thread));

        $http.get("http://localhost:3000/messages")
            .then(response => response.data)
            .then(data => dispatch(selectThread(thread, data)))
    };

    const postMessage = (thread, messageArgs) => dispatch => {
        dispatch(postMessageRequest(thread));

        const defaults = {
            id: uuid(),
            sentAt: new Date(),
            thread: thread
        };
        const message = Object.assign({}, defaults, messageArgs);

        return $http.post(`http://localhost:3000/messages/`, message)
            .then(response => response.data)
            .then(data => dispatch(addMessage(thread, data)));
    };

    return { fetchMessages, postMessage }
}