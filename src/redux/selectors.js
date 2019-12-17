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
  const props = ['Metadata.Annotations.Categories', 'Spec.Provider.Name', 'Metadata.Annotations.Vendor', 'Experiments']
  const names = ['type', 'provider', 'complexity', 'maturity']

  const filters = props.map(prop => {
    return [...new Set(store.charts.loadedCharts.map((chart) => {



      return prop.split(".").reduce(function (result, key) {


        if (key == 'Experiments') {
          let maturityInfo = new Set()
          let experimentsSpec = chart[props[3]].map(el => el.Spec);
          let maturityData = experimentsSpec.map(el => el.Maturity);
          maturityInfo = Array.from(new Set(maturityData))
          return maturityInfo;
        }
        return result[key]
      }, chart)
    }))]
  }).reduce((res, filterArr, ind) => {
    if (ind === 3) {
      let maturityInformation = filterArr.flat(Infinity)
      filterArr = Array.from(new Set(maturityInformation))
    }
    res[names[ind]] = filterArr
    return res
  }, {})
  return filters
}
