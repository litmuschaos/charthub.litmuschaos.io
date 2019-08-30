import { LOAD_CHART_SUCCESS, LOAD_CHARTS_SUCCESS } from "../actionTypes";

const initialState = {
  charts: [],
  chart: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHART_SUCCESS: {
      
      return {
        ...state,
        chart: action.data
      }
    }
    case LOAD_CHARTS_SUCCESS: {
      return {
        ...state,
        charts: action.data
      }
    }
    default:
      return state;
  }
}
