import {createReducer} from '@reduxjs/toolkit';
import {authenticated} from './actions';

const initialState = {
  authenticated: false,
  isSplashVisible: true,
  authLoading: false,
  journals: [],
};

export default createReducer(initialState, {
  [authenticated]: (state, action) => ({
    ...state,
    authenticated: action.payload,
  }),
});
