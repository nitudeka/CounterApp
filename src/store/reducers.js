import {createReducer} from '@reduxjs/toolkit';
import {
  authenticated,
  resetAuth,
  authErrors,
  isAuthenticating,
  activeScreen,
  setExpenseStatus,
  setExpenses,
  setAddingExpense,
  setFetchingExpenses,
} from './actions';

const initialState = {
  authenticated: false,
  isAuthenticating: false,
  authErrors: [],
  activeScreen: 'HomeScreen',
  expenseStatus: '',
  expenses: [],
  addingExpense: false,
  fetchingExpenses: false,
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
  [activeScreen]: (state, action) => ({
    ...state,
    activeScreen: action.payload,
  }),
  [setExpenseStatus]: (state, action) => ({
    ...state,
    expenseStatus: action.payload,
  }),
  [setExpenses]: (state, action) => ({
    ...state,
    expenses: action.payload,
  }),
  [setAddingExpense]: (state, action) => ({
    ...state,
    addingExpense: action.payload,
  }),
  [setFetchingExpenses]: (state, action) => ({
    ...state,
    fetchingExpenses: action.payload,
  }),
});
