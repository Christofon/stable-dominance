export default function (historical) {
  return {
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: "MarketCap",
    },
    series: historical,
  };
}
