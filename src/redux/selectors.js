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
  console.log(charts);
  return charts;
}
