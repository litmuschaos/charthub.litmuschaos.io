export const getChartsState = store => store.charts;

export const getChartList = (store, sort) => {
  const charts = getChartsState(store) ? getChartsState(store).charts : [];
  console.log('triggered');
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
  return charts;
}

export const getChartById = (store, chartName) => {
  return getChartsState(store) ? getChartsState(store).charts.find((chart) => chart.metadata.annotations.vendor === chartName) : {};
}
