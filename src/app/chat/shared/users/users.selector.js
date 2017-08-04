import { createSelector } from 'reselect';

export const getUsersState = (state) => state.users;

export const getCurrentUser = createSelector(
    getUsersState,
    (state) => state.currentUser
)