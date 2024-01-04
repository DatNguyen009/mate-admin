export const optionChart = {
  legend: {
    orient: "horizontal",
    left: "center",
    textStyle: {
      color: ["#74788d"],
    },
  },
  tooltip: {
    formatter: params => {
      let label = `${params.name}: ${params.value} (${params.percent}%)`;
      return label.toLocaleString();
    },
  },
  label: {
    formatter: params => {
      let label = `${params.name}: ${params.value} (${params.percent}%)`;
      return label.toLocaleString();
    },
  },
};

export const seriesChart = { radius: "65%", center: ["50%", "55%"] };
