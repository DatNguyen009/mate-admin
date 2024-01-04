import React, { useMemo } from "react";
import ReactEcharts from "echarts-for-react";
import PropTypes from "prop-types";

const FunnelChart = props => {
  const {
    title: text,
    dataChart,
    color,
    label,
    name,
    width,
    height,
    option,
    ...rest
  } = props;
  const dataLeadStatus =
    Array.isArray(dataChart) &&
    dataChart?.map(item => {
      return {
        value: item.count,
        name: item.objectId,
        itemStyle: {
          color: item.color,
        },
      };
    });

  const legend = useMemo(
    () => Array.isArray(dataChart) && dataChart.map(item => item.objectId),
    [dataChart]
  );

  const getOption = () => {
    return {
      title: {
        text,
      },
      tooltip: {
        trigger: "item",
        feature: {
          saveAsImage: {},
        },
      },
      color,
      legend: {
        data: legend,
      },
      series: [
        {
          name,
          type: "funnel",
          gap: 1,
          top: "23%",
          left: "10%",
          maxSize: "55%",
          label: {
            show: true,
            position: "right",
            formatter: "{b} : {c}",
            fontSize: 13,
          },
          width,
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1,
          },
          data: dataLeadStatus,
          ...rest,
        },
      ],
    };
  };

  return (
    <React.Fragment>
      <ReactEcharts style={{ height }} option={getOption()} />
    </React.Fragment>
  );
};
export default FunnelChart;

FunnelChart.propTypes = {
  option: PropTypes.object,
  dataChart: PropTypes.array,
  color: PropTypes.array,
  label: PropTypes.object,
  name: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
};
FunnelChart.defaultProps = {
  color: [
    "#5470c6",
    "#91cc75",
    "#fac858",
    "#ee6666",
    "#73c0de",
    "#3ba272",
    "#fc8452",
    "#9a60b4",
    "#ea7ccc",
  ],
  name: "Funnel Title",
  height: "479px",
  width: "70%",
};
