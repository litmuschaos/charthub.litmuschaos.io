import { LOAD_CHART_SUCCESS, LOAD_CHARTS_SUCCESS, FILTER_CHARTS_ON_SEARCH, FILTER_CHARTS_BY_FILTERS } from "../actionTypes";

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
    case FILTER_CHARTS_BY_FILTERS: {
      // const termsFilter = action.filters
      const termsFilter = [
        {name: "Kubernetes", annotation: "type", state_value: true},
        {name: "OpenEBS", annotation: "type", state_value: false},
        {name: "Mayadata", annotation: "provider", state_value: false},
        // {name: "CNCF", annotation: "complexity", state_value: false},
        // {name: "MayaData", annotation: "complexity", state_value: false}
      ]
      // console.log(termsFilter)
      // console.log(state.loadedCharts)
      // let charts = action.filters ? state.loadedCharts.filter(chart => chart.Metadata.Annotations.Categories.toUpperCase().indexOf(termsFilter) > -1) : state.loadedCharts
      // chart.Metadata.Annotations.Categories =>
      let charts;
      termsFilter.map(item => {
        if (item.state_value) {
          switch (item.annotation) {
            case "type" : {
              charts = termsFilter ? state.loadedCharts.filter(chart => chart.Metadata.Annotations.Categories === item.name) : state.loadedCharts
              console.log(charts)
              break;
            }
            case "provider" : {
              charts = termsFilter ? state.loadedCharts.filter(chart => chart.Spec.Provider === item.name) : state.loadedCharts
              // console.log(charts)
              break;
            }
            default :{
              console.log("nothing selected")
            }
          }
        }
      })
      
      
      
      // let charts = termsFilter ? state.loadedCharts.map(chart => {
        // console.log(chart.Metadata.Annotations.Categories);
      // }) : state.loadedCharts
      
      
      
      // console.log(charts)
      return {
        ...state,
        charts
      }
    }
    default:
      return state;
  }
}
