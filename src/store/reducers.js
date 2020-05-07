import {createReducer} from '@reduxjs/toolkit';
import {
  authenticated,
  resetAuth,
  authErrors,
  isAuthenticating,
} from './actions';

const initialState = {
  authenticated: false,
  isAuthenticating: false,
  authErrors: [],
};

export default createReducer(initialState, {
  [authenticated]: (state, action) => ({
    ...state,
    authenticated: action.payload,
  }),
  [isAuthenticating]: (state, action) => ({
    ...state,
    isAuthenticating: action.payload,
  }),
  [authErrors]: (state, action) => ({
    ...state,
    authErrors: action.payload,
  }),
  [resetAuth]: state => ({
    ...state,
    isAuthenticating: false,
    authErrors: [],
  }),
});
