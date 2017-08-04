import { combineReducers } from 'redux';
import { ThreadReducers } from './chat/shared/threads/threads.reducer';
import { UserReducers } from './chat/shared/users/users.reducer';
import { router } from 'redux-ui-router';

UserReducers; 
combineReducers;

const rootReducer = combineReducers({
    users: UserReducers,
    threads: ThreadReducers,
    router
});

export default rootReducer;