import React, { useState } from "react";
import { CommonText } from "./TextCommon";
import { Card } from "reactstrap";
import PropTypes from "prop-types";
import { Bar, Doughnut } from "react-chartjs-2";
import { CommonSelect } from "./inputCommon";

export default function ChartDashboard(props) {
  const { title, typeDefault, data, number } = props;
  const [typeChart, setTypeChart] = useState(typeDefault);

  const renderSwitch = type => {
    switch (type) {
      case "bar":
        const dataFixColor = {
          ...data,
          datasets: data.datasets?.map(item => ({
            ...item,
            backgroundColor: "#2490ef",
          })),
        };
        return <Bar data={dataFixColor} />;
      // case "doughnut":
      //   return <Doughnut data={data} />;
    }
  };

  const handleChangeType = e => {
    setTypeChart(e.target.value);
  };

  return (
    <div className="chartDashboard">
      <Card body>
        <div className="chartTitle">
          <CommonText level={10}>{title}</CommonText>
        </div>
        <div className="chartSelect">
          {/* <CommonSelect
            className="form-control"
            value={typeChart}
            onChange={e => handleChangeType(e)}
          >
            <option value="bar">Bar</option>
            <option value="doughnut">Doughnut</option>
          </CommonSelect> */}
        </div>
      </Card>
      {renderSwitch(typeChart)}
    </div>
  );
}

ChartDashboard.propTypes = {
  typeDefault: PropTypes.string,
  data: PropTypes.object,
  title: PropTypes.string,
  number: PropTypes.number,
};
