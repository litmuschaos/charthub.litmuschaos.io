import { LOAD_CHART_SUCCESS, LOAD_CHARTS_SUCCESS, FILTER_CHARTS_ON_SEARCH } from "../actionTypes";

const initialState = {
  charts: [],
  chart: {},
  loadedCharts: []
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
        charts: action.data,
        loadedCharts: action.data
      }
    }
    case FILTER_CHARTS_ON_SEARCH: {
      const term = action.searchTerm.toUpperCase()
      console.log(term)
      console.log(state.loadedCharts)
      let charts = action.searchTerm ? state.loadedCharts.filter(chart => chart.Metadata.Name.toUpperCase().indexOf(term) > -1) : state.loadedCharts
      console.log(charts)
      return {
        ...state,
        charts
      }
    }
    default:
      return state;
  }
}
