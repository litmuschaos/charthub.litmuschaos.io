import { GET_CHARTS, LOAD_CHARTS_LOADING, LOAD_CHARTS_SUCCESS } from "./actionTypes";

export const getCharts = content => ({
  type: GET_CHARTS,
  payload: {
    content
  }
});

export const loadCharts = () => dispatch => {
  dispatch({
    type: LOAD_CHARTS_LOADING
  })
  fetch('http://localhost:8080/charts')
  .then(function(response) {
    console.log(response);
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    dispatch({ type: LOAD_CHARTS_SUCCESS, data })
  });
};
