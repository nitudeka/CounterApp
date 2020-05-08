import {createAction} from '@reduxjs/toolkit';
import {API_URL} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

export const authenticated = createAction('authenticated');
export const isAuthenticating = createAction('isAuthenticating');
export const authErrors = createAction('authErrors');
export const resetAuth = createAction('resetAuth');

export const authenticate = (path, data) => async dispatch => {
  try {
    dispatch(isAuthenticating(true));
    dispatch(authErrors([]));
    const res = await fetch(API_URL + path, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (res.status === 200) {
      await AsyncStorage.setItem('token', resData.token);
      dispatch(authenticated(true));
    } else {
      dispatch(authErrors([resData.message]));
    }
    dispatch(isAuthenticating(false));
  } catch (err) {
    dispatch(isAuthenticating(false));
    dispatch(authErrors(['Something happened']));
  }
};

export const signout = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  dispatch(authenticated(false));
};
