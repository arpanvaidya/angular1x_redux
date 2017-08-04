import {
    ADD_THREAD
    , SELECT_THREAD
    , ADD_MESSAGE
    , GET_MESSAGES_REQUEST
    , POST_MESSAGE_REQUEST
} from './threads.actions'

const INITIAL_STATE = {
    ids: [],
    currentThreadId: null,
    entities: {},
    isFetching: false,
    isPosting: false
}

export const ThreadReducers = function (state = INITIAL_STATE, { meta, payload, type }) {
    switch (type) {
        case ADD_THREAD: {
            const thread = payload.thread;

            if (state.ids.includes(thread.id)) {
                return state;
            }

            return {
                ids: [...state.ids, thread.id],
                currentThreadId: state.currentThreadId,
                entities: Object.assign({}, state.entities, {
                    [thread.id]: thread
                })
            };
        }
        case SELECT_THREAD: {
            const thread = payload.thread;
            const currentThreadId = thread.id || state.currentThreadId;
            const oldThread = state.entities[thread.id];
            const newMessages = payload.messages.filter((message) => message.thread.id === thread.id);

            const newThread = Object.assign({}, oldThread, {
                messages: newMessages,
                unreadCount: 0
            })

            return {
                ids: state.ids,
                currentThreadId: currentThreadId,
                entities: Object.assign({}, state.entities, { [thread.id]: newThread }),
                isFetching: false
            }
        }
        case ADD_MESSAGE: {
            const thread = payload.thread;
            const newMessage = payload.message;

            // grab the old thraed from entities
            const oldThread = state.entities[thread.id];

            // create a new thread which has our newMessage
            const newThread = Object.assign({}, oldThread, {
                messages: [...(oldThread.messages || []), newMessage]
            });

            return {
                isFetching: false,
                isPosting: false,
                ids: state.ids, // unchanged
                currentThreadId: state.currentThreadId, // unchanged
                entities: Object.assign({}, state.entities, {
                    [thread.id]: newThread
                })
            };
        }

        case GET_MESSAGES_REQUEST: {
            return Object.assign({}, state, { isFetching: true });
        }

        case POST_MESSAGE_REQUEST: {
            return Object.assign({}, state, { isPosting: true });
        }

        default: return state;
    }
}

