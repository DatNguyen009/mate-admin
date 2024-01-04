import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ReactEcharts from "echarts-for-react";
import { Select } from "antd";
import { CardTitle } from "reactstrap";

const handleDataChart = (typeChart, data, series) => {
  switch (typeChart) {
    case "pie": {
      return {
        xAxis: {
          show: false,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: typeChart,
            data,
            ...series,
          },
        ],
      };
    }
    case "bar":
    case "line": {
      const dataAxis = data.map(item => item.name);
      const newData = data.map(item => item.value);
      return {
        xAxis: {
          show: true,
          type: "category",
          data: dataAxis,
        },
        yAxis: {
          show: true,
          type: "value",
        },
        series: [
          {
            type: typeChart,
            data: newData,
          },
        ],
      };
    }
    default:
      break;
  }
};

function IChart({
  type,
  title,
  color,
  style,
  series,
  optionData,
  styleTitle,
  defaultType,
  optionSelect,
  dataChart: data,
}) {
  const [typeChart, setTypeChart] = useState(defaultType);

  const optionChart = useMemo(() => {
    return {
      color,
      title: {
        textAlign: "left",
        textStyle: {
          fontSize: 14,
          color: "#586074",
          ...styleTitle,
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: data,
        },
      ],
      ...handleDataChart(!type ? typeChart : type, data, series),
      ...optionData,
    };
  }, [type, typeChart, data]);

  return (
    <>
      <CardTitle>{title}</CardTitle>
      {!type && (
        <Select
          onChange={value => {
            setTypeChart(value);
          }}
          defaultValue={defaultType}
          options={!optionSelect && optionChart}
        />
      )}

      <ReactEcharts style={style} option={optionChart} />
    </>
  );
}

IChart.propTypes = {
  type: PropTypes.string,
  color: PropTypes.array,
  style: PropTypes.object,
  title: PropTypes.string,
  series: PropTypes.object,
  dataChart: PropTypes.array,
  optionData: PropTypes.object,
  styleTitle: PropTypes.object,
  optionSelect: PropTypes.array,
  defaultType: PropTypes.string,
};

IChart.defaultProps = {
  select: true,
  dataChart: [],
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
};

export default IChart;
