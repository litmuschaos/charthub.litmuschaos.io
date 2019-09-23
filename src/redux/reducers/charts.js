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
      // console.log(charts)
      return {
        ...state,
        charts
      }
    }
    
    case FILTER_CHARTS_BY_FILTERS: {
      const termsFilter = action.filters
      let charts=[];
      if (termsFilter === [] || !(termsFilter.some(item => item.state_value === true))) {
        // implemented a check if all filters are disabled
        charts = state.loadedCharts;
      }
      else {
        let pool = [];
        termsFilter.map(x => {
          if (x.state_value) {
            pool.push (x.name)
          }
        })
        


        termsFilter.map(term => {

          if(term.state_value === true) {
            charts = state.loadedCharts.filter(chart => pool.some(pool_item=> chart.Metadata.Annotations.Categories === pool_item));
            // charts.push(state.loadedCharts.filter(chart => chart.Metadata.Annotations.Categories === term.name));
          }
          // else {
          //   termsFilter.pop(term);
          //   console.log(termsFilter)
          //   }
        })






      }

      return {
        ...state,
        charts
      }
    }
      
     







/*

      termsFilter.map(item => {
          // console.log(item)
        if (item.state_value) {

          switch (item.annotation) {
            case "type" : {
              // charts = termsFilter ? state.loadedCharts.filter(chart => chart.Metadata.Annotations.Categories === item.name) : state.loadedCharts
              charts = state.loadedCharts
              state.loadedCharts.map(unit => {
                if(unit.Metadata.Annotations.Categories === item.name){
                  if(!item.state) {
                    charts.pop(unit)
                  }
                  
                }
              })
              
              charts = '';
              return {
                ...state,
                charts
              }
              break;
            }
            case "provider" : {
              charts = termsFilter ? state.loadedCharts.filter(chart => chart.Spec.Provider.Name === item.name) : state.loadedCharts
              // state.loadedCharts = charts
              console.log(charts)
              return {
                ...state,
                charts
              }
              // break;
            }
            default :{
              console.log()
            }
          }
        } 
      });
        */
      
  
    // }
    
    default:
      return state;
  }
}
