import {createAction} from '@reduxjs/toolkit';
import {API_URL} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

export const authenticated = createAction('authenticated');
export const isAuthenticating = createAction('isAuthenticating');

export const authenticate = (path, data) => async dispatch => {
  try {
    dispatch(isAuthenticating(true));
    const res = await fetch(API_URL + path, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (res.status === 200) {
      await AsyncStorage.setItem('token', resData.token);
      dispatch(authenticated(true));
    }
    // dispatch(isAuthenticating(false));
  } catch (err) {
    console.log(err);
  }
};

export const signout = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  dispatch(authenticated(false));
};
