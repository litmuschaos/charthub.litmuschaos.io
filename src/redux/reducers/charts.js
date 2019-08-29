import { GET_CHARTS, LOAD_CHARTS_ERROR, LOAD_CHARTS_LOADING, LOAD_CHARTS_SUCCESS } from "../actionTypes";
import dummyData from '../mockData/dummyData';

const initialState = {
  charts: [],
  chart: {},
  loading: false,
  error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHARTS: {
      console.log('get charts was called');
      return {
        ...state,
        charts: []
      };
    }
    case LOAD_CHARTS_LOADING: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }
    case LOAD_CHARTS_SUCCESS: {
      return {
        ...state,
        charts: action.data,
        loading: false
      }
    }
    case LOAD_CHARTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    default:
      return state;
  }
}
