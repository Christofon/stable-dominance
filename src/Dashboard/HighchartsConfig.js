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
        text: "Market Cap",
      },
    },
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: "Market Cap",
    },
    series: historical,
    legend: {
      enabled: false
    },
  };
}
