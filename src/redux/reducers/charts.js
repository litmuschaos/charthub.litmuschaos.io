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
      let charts = action.searchTerm ? state.loadedCharts.filter(chart => chart.Metadata.Name.toUpperCase().indexOf(term) > -1) : state.loadedCharts
      return {
        ...state,
        charts
      }
    }
    
    case FILTER_CHARTS_BY_FILTERS: {
      const termsFilter = action.filters
      console.log(action.filters, 'action.filters');
      console.log(state.loadedCharts, 'state.loadedCharts')
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
            let charts_Categories = []
            let charts_Provider = []
            let charts_Platforms = []
            charts_Categories = state.loadedCharts.filter(chart => pool.some(pool_item => chart.Metadata.Annotations.Categories === pool_item));
            charts_Provider = state.loadedCharts.filter(chart => pool.some(pool_item => chart.Spec.Provider.Name === pool_item));
            charts_Platforms = state.loadedCharts.filter(chart => {
              console.log(chart, 'CHARTTTTTTT');
              
              let platformInfo = []
              let platformData
              let experimentSpec = chart.Experiments.map(el => el.Spec);
              platformData = experimentSpec.map(el => el.Platforms)
              platformData.forEach(element => {
                element.forEach(el => platformInfo.push(el))
              });
              const newPlatforms = Array.from(new Set(platformInfo))
              console.log(newPlatforms, 'newPlatforms');
              const filterPlatforms = newPlatforms.find(platform => term.annotation === 'platforms' && term.name === platform)
              console.log(filterPlatforms, 'filterPlatforms');
              console.log(pool, 'poool');
              
              return pool.some(pool_item => filterPlatforms === pool_item)
            });
            console.log(charts_Categories, 'charts_Categories', charts_Provider, 'charts_Provider',charts_Platforms , 'charts_Platforms');
            
            // charts_Platforms = state.loadedCharts.filter(chart)
            if (charts_Provider.length !==0 || charts_Categories.length !==0 || charts_Platforms.length !==0) {
              let chartsArray = [...charts_Categories, ...charts_Provider, ...charts_Platforms]
              // charts = charts_Categories.filter(x => charts_Provider.includes(x));
              charts = Array.from(new Set(chartsArray))
              console.log(charts, 'HELLLLLLLLLLLLLLLO CHART1');
            }
            else {
              charts = [...new Set ([...charts_Provider, ...charts_Categories])];
            }
               
          }
        })

      }

      return {
        ...state,
        charts
      }
    }
    
    default:
      return state;
  }
}