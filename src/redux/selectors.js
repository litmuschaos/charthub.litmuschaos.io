export const getChartsState = store => store.charts;

export const getChartList = (store) => {
  return getChartsState(store) ? getChartsState(store).charts : [];
}

export const getChartById = (store, chartName) => {
  return getChartsState(store) ? getChartsState(store).charts.find((chart) => chart.metadata.annotations.vendor === chartName) : {};
}
