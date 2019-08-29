import { LOAD_CHART_SUCCESS, LOAD_CHARTS_BY_ID_LOADING, GET_CHARTS, LOAD_CHARTS_LOADING, LOAD_CHARTS_SUCCESS } from "./actionTypes";

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
    return response.json();
  })
  .then(function(data) {
    dispatch({ type: LOAD_CHARTS_SUCCESS, data })
  });
};

export const loadChartById = (chartId) => (dispatch) => {
  dispatch({
    type: LOAD_CHARTS_BY_ID_LOADING
  })
  // console.log(chartId);
  fetch(`http://localhost:8080/charts/${chartId}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    dispatch({ type: LOAD_CHART_SUCCESS, data })
  });
};
