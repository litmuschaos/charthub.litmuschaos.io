import { GET_CHARTS } from "./actionTypes";

export const getCharts = content => ({
  type: GET_CHARTS,
  payload: {
    content
  }
});
