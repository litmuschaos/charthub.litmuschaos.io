import { combineReducers } from 'redux';
import chartsReducer from './reducers/charts';
import themeReducer from './reducers/theme';

const GET_OPERATORS = 'GET_OPERATORS';
const GET_OPERATOR = 'GET_OPERATOR';

const SET_URL_SEARCH_STRING = 'SET_URL_SEARCH_STRING';

const reduxConstants = {
  GET_OPERATORS,
  GET_OPERATOR,
  SET_URL_SEARCH_STRING
};

const reducers = {
  charts: chartsReducer,
  theme: themeReducer,
};

const reduxReducers = combineReducers(reducers);

export { reduxConstants, reduxReducers, reducers };
