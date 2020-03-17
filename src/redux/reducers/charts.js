import {
  LOAD_CHART_SUCCESS,
  LOAD_CHARTS_SUCCESS,
  FILTER_CHARTS_ON_SEARCH,
  FILTER_CHARTS_BY_FILTERS,
  LOAD_ANALYTICS_DATA,
  LOAD_GITHUB_STARS
} from '../actionTypes';

const initialState = {
  charts: [],
  chart: {},
  loadedCharts: [],
  analytics: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHART_SUCCESS: {
      return {
        ...state,
        chart: action.data
      };
    }

    case LOAD_CHARTS_SUCCESS: {
      return {
        ...state,
        charts: action.data,
        loadedCharts: action.data
      };
    }

    case FILTER_CHARTS_ON_SEARCH: {
      const term = action.searchTerm.toUpperCase();
      let charts = action.searchTerm
        ? state.loadedCharts.filter(
            chart => chart.Metadata.Name.toUpperCase().indexOf(term) > -1
          )
        : state.loadedCharts;
      return {
        ...state,
        charts
      };
    }

    case FILTER_CHARTS_BY_FILTERS: {
      const termsFilter = action.filters;
      let charts = [];
      if (
        termsFilter === [] ||
        !termsFilter.some(item => item.state_value === true)
      ) {
        // implemented a check if all filters are disabled
        charts = state.loadedCharts;
      } else {
        let pool = [];
        termsFilter.map(x => {
          if (x.state_value) {
            pool.push(x.name);
          }
          return null
        });
        termsFilter.map(term => {
          if (term.state_value === true) {
            let charts_Categories = [];
            let charts_Provider = [];
            charts_Categories = state.loadedCharts.filter(chart =>
              pool.some(
                pool_item => chart.Metadata.Annotations.Categories === pool_item
              )
            );
            charts_Provider = state.loadedCharts.filter(chart =>
              pool.some(pool_item => chart.Spec.Provider.Name === pool_item)
            );

            if (
              charts_Provider.length !== 0 &&
              charts_Categories.length !== 0
            ) {
              charts = charts_Categories.filter(x =>
                charts_Provider.includes(x)
              );
            } else {
              charts = [...new Set([...charts_Provider, ...charts_Categories])];
            }
          }
          return null
        });
      }

      return {
        ...state,
        charts
      };
    }

    case LOAD_ANALYTICS_DATA: {
      return {
        ...state,
        analytics: action.data
      };
    }
    case LOAD_GITHUB_STARS: {
      return {
        ...state,
        githubdata: action.data
      };
    }
    default:
      return state;
  }
}
