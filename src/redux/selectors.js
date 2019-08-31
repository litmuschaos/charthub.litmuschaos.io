import { keysToCamel } from "../common/helpers"

export const getChartsState = store => store.charts;
export const getChartById = store => keysToCamel(store.charts.chart)
export const getChartList = (store, sort) => {
  let charts = getChartsState(store) ? getChartsState(store).charts : [];
  charts = charts.map((chart) => keysToCamel(chart))
  if (sort) {
    charts.sort((a, b) => {
      if (a.firstname < b.firstname) {
        if (sort.isAsc) {
          return -1;
        }
        return 1;
      }
      if (a.firstname > b.firstname) {
        if (sort.isAsc) {
          return 1;
        }
        return -1;
      }
      return 0;
    })
  }
  return charts;
}
export const getFilters = store => {
  const props = ['Metadata.Annotations.Categories', 'Spec.Provider.Name', 'Metadata.Annotations.Vendor']
  const names = ['type', 'provider', 'complexity']
  const filters = props.map(prop => {
    return [...new Set(store.charts.loadedCharts.map((chart) => {
      return prop.split(".").reduce(function(result, key) {
        return result[key]
      }, chart)
    }))]
  }).reduce((res, filterArr, ind) => {
    res[names[ind]] = filterArr
    return res
  }, {})
  console.log('filters were returned');
  return filters
}
