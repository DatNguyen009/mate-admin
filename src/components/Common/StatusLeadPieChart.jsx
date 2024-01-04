import React from "react";
import ReactEcharts from "echarts-for-react";

import PropTypes from "prop-types";

const StatusLeadPieChart = props => {
  const {
    dataCharts: { leadGroupByStatus = [] },
  } = props;
  const dataLeadStatus = leadGroupByStatus.map(item => {
    return {
      value: item.count,
      name: item.objectId,
    };
  });

  const getOption = () => {
    return {
      toolbox: {
        show: false,
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "horizontal",
        left: "center",
        // labels: leadStatusLabel,
        textStyle: {
          color: ["#74788d"],
        },
      },
      color: ["#f46a6a", "#34c38f", "#50a5f1", "#f1b44c", "#556ee6"],
      series: [
        {
          name: "Số lead",
          type: "pie",
          radius: "55%",
          center: ["50%", "55%"],
          data: dataLeadStatus,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };
  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "479px" }} option={getOption()} />
    </React.Fragment>
  );
};
export default StatusLeadPieChart;

StatusLeadPieChart.propTypes = {
  dataCharts: PropTypes.object,
};
