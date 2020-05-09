import {createRef} from 'react';
import {createAction} from '@reduxjs/toolkit';
import {API_URL} from 'react-native-dotenv';
import AsyncStorage from '@react-native-community/async-storage';

export const navigationRef = createRef();

export const authenticated = createAction('authenticated');
export const isAuthenticating = createAction('isAuthenticating');
export const authErrors = createAction('authErrors');
export const resetAuth = createAction('resetAuth');
export const activeScreen = createAction('activeScreen');
export const setExpenses = createAction('setExpenses');

export const navigate = screenName => {
  navigationRef.current?.navigate(screenName);
  activeScreen(screenName);
};

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

export const addExpense = data => async dispatch => {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(API_URL + 'app/expense', {
    method: 'POST',
    headers: {'content-type': 'application/json', authorization: token},
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  if (res.status === 200) {
    dispatch(setExpenses(resData.data));
    navigate('HomeScreen');
  }
};

export const getExpenses = setLoading => async dispatch => {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(API_URL + 'app/expense?timestamp=' + Date.now(), {
    method: 'GET',
    headers: {'content-type': 'application/json', authorization: token},
  });
  const resData = await res.json();
  if (res.status === 200) {
    dispatch(setExpenses(resData.data));
    if (setLoading) setLoading(false);
  }
};
