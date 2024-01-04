import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import moment from "moment";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};
export const ChartKpi = React.forwardRef((props, ref) => {
  const { colors, showChart } = props;
  const [selectionState, setSelectionState] = useState([]);

  const [date, setDate] = useState([]);

  useEffect(() => {
    const test = selectionState.map(item =>
      moment(item.to?.iso).format("MM/YYYY")
    );
    const uniqueArray = test.filter(function (item, pos) {
      return test.indexOf(item) == pos;
    });
    setDate(uniqueArray);
  }, [selectionState]);

  const monthName = item => moment(item.to?.iso, "YYYY-MM-DD").format("MMM");
  const result = _.groupBy(selectionState, monthName);

  const data = {
    labels: date.sort(),
    datasets: Object.entries(result).map((item, index) => {
      return {
        label: item[0],
        data:
          showChart === "saleTotal"
            ? item[1].map(item => item?.saleTotal)
            : showChart === "bonus"
            ? item[1].map(item => item?.bonus)
            : item[1].map(item => item?.commission),
        backgroundColor: colors[index],
      };
    }),
  };

  useImperativeHandle(ref, () => ({
    reRender: data => {
      setSelectionState(data);
    },
  }));

  return <Bar options={options} data={data} />;
});

ChartKpi.propTypes = {
  colors: PropTypes.array,
  kpiGroup: PropTypes.array,
  dataTableChart: PropTypes.any,
  showChart: PropTypes.string,
};
