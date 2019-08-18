import { GET_CHARTS } from "../actionTypes";

import dummyData from '../mockData/dummyData';

const initialState = {
  charts: dummyData,
  chart: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHARTS: {
      console.log('get charts was called');
      return {
        ...state,
        charts: ['asd']
      };
    }
    default:
      return state;
  }
}
