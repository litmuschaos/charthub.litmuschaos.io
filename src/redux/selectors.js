export const getChartsState = store => store.charts;
export const getSelectedChart = (store) => {
  return store.chart ? store.chart : {};
}
export const getChartList = (store, sort) => {
  const charts = getChartsState(store) ? getChartsState(store).charts : [];
  if(sort) {
    charts.sort((a, b) => {
      if(a.firstname < b.firstname) {
        if(sort.isAsc) {
          return -1;
        }
        return 1;
      }
      if(a.firstname > b.firstname) {
        if(sort.isAsc) {
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
