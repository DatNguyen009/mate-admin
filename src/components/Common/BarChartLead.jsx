import React, { useMemo } from "react";

import moment from "moment/moment";
import { Bar } from "react-chartjs-2";
import { sortBy } from "lodash";
import PropTypes from "prop-types";

const BarChartLead = props => {
  const {
    dataCharts: { leadGroupByMonth = [] },
  } = props;

  const dataChart = useMemo(() => {
    const sortedData = sortBy(leadGroupByMonth, "objectId.month");
    const values = sortedData.map(item => {
      return item.count;
    });
    const keys = sortedData.map(item => item.objectId.month);

    return {
      values,
      keys,
    };
  }, [JSON.stringify(leadGroupByMonth)]);

  const data = {
    labels: dataChart.keys.map(item => {
      return `Tháng ${item}`;
    }),
    datasets: [
      {
        label: "Số lượng khách hàng tiềm năng",
        labelColor: "rgba(111, 133, 234, 1)",
        backgroundColor: "rgba(111, 133, 234, 1)",
        borderColor: "rgba(111, 133, 234, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(111, 133, 234, 1)",
        hoverBorderColor: "rgba(111, 133, 234, 1)",
        data: [...dataChart.values, 0],
      },
    ],
  };

  const option = {
    scales: {
      dataset: [
        {
          barPercentage: 0.4,
        },
      ],
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <React.Fragment>
      <Bar width={474} height={300} data={data} options={option} />
    </React.Fragment>
  );
};

export default BarChartLead;

BarChartLead.propTypes = {
  dataCharts: PropTypes.object,
};
