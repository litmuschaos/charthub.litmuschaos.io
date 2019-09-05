import { FILTER_CHARTS_BY_FILTERS, LOAD_CHART_SUCCESS, LOAD_CHARTS_SUCCESS, FILTER_CHARTS_ON_SEARCH } from "./actionTypes";

export const loadCharts = () => dispatch => {
  fetch('api/charts')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    dispatch({ type: LOAD_CHARTS_SUCCESS, data })
  });
};

export const loadChartById = (chartId) => (dispatch) => {
  fetch(`api/charts/${chartId}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    dispatch({ type: LOAD_CHART_SUCCESS, data })
  });
};

export const filterChartsOnSearch = (searchTerm) => (dispatch) => {
  dispatch({ type: FILTER_CHARTS_ON_SEARCH, searchTerm})
}

export const applyFilters = (filters) => (dispatch) => {
  dispatch({ type: FILTER_CHARTS_BY_FILTERS, filters })
}
