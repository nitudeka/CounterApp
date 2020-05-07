import {createReducer} from '@reduxjs/toolkit';
import {authenticated, isAuthenticating} from './actions';

const initialState = {
  authenticated: false,
  isAuthenticating: false,
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
});
