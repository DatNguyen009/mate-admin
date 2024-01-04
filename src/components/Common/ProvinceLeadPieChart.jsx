import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const ProvinceLeadPieChart = props => {
  const {
    dataCharts: { laedGroupByProvince = [] },
  } = props;

  const dataLeadProvince = laedGroupByProvince.map(item => {
    return item.count;
  });

  const labelLeadProvince = laedGroupByProvince.map(item => {
    if (item.objectId === null) item.objectId = "Không có thông tin";
    return item.objectId;
  });

  const data = {
    series: dataLeadProvince,
    options: {
      labels: labelLeadProvince,
      colors: ["#34c38f", "#556ee6", "#f46a6a", "#50a5f1", "#f1b44c"],
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        verticalAlign: "middle",
        floating: false,
        fontSize: "14px",
        offsetX: 0,
        offsetY: -10,
      },
      // responsive: [
      //   {
      //     breakpoint: 600,
      //     options: {
      //       chart: {
      //         height: 240,
      //       },
      //       legend: {
      //         show: false,
      //       },
      //     },
      //   },
      // ],
    },
  };

  return (
    <React.Fragment>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="pie"
        height="479"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default ProvinceLeadPieChart;

ProvinceLeadPieChart.propTypes = {
  dataCharts: PropTypes.object,
};
