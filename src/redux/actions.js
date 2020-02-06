import { LOAD_CHART_SUCCESS, LOAD_CHARTS_SUCCESS, FILTER_CHARTS_ON_SEARCH, FILTER_CHARTS_BY_FILTERS, LOAD_ANALYTICS_DATA, LOAD_GITHUB_STARS} from "./actionTypes";

var apiEnpoint =  window.location.hostname.includes('localhost')?'http://localhost:8080':'/api';
export const loadCharts = () => dispatch => {
  fetch(`${apiEnpoint}/charts`)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    dispatch({ type: LOAD_CHARTS_SUCCESS, data })
  });
};

export const loadChartById = (chartId) => (dispatch) => {
  fetch(`${apiEnpoint}/charts/${chartId}`)
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

export const analyticsData = () => dispatch => {
  fetch(`${apiEnpoint}/analytics`)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    dispatch({type: LOAD_ANALYTICS_DATA, data})
  });
};

export const githubData = () => (dispatch) => {
  fetch(`https://api.github.com/repos/litmuschaos/litmus`)
  .then(function (response) {
    return response.json();

  })
  .then(function(data){
    dispatch({type: LOAD_GITHUB_STARS, data})
  });
};