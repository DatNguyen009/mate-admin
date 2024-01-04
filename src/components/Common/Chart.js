import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import Spacing from "./Spacing";
import ReactApexChart from "react-apexcharts";

const dataDefaults = {
  charttype: "Column chart",
  series: [
    {
      name: "Net Profit",
      data: [46, 57, 59, 54, 62, 58, 64, 60, 66, 40],
    },
    {
      name: "Revenue",
      data: [74, 83, 102, 97, 86, 106, 93, 114, 94, 100],
    },
    {
      name: "Free Cash Flow",
      data: [37, 42, 38, 26, 47, 50, 54, 55, 43, 60],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    colors: ["#34c38f", "#556ee6", "#f46a6a"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  },
  type: "bar",
  height: 350,
};
export default function ChartComponents(props) {
  const {
    charttype = dataDefaults.charttype,
    options = dataDefaults.options,
    series = dataDefaults.series,
    type = dataDefaults.type,
    height = dataDefaults.height,
  } = props;

  const [chartState, setChartState] = useState({
    filterOpen: false,
    dropdownOpen: false,
  });

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="mb-4">
                <Row>
                  <Col lg={10}>{charttype}</Col>
                  <Col lg={2} className="text-center d-flex">
                    <Button
                      color="light"
                      className="btn-rounded mx-2"
                      onClick={() =>
                        setChartState({
                          ...chartState,
                          filterOpen: !chartState.filterOpen,
                        })
                      }
                    >
                      <i className="bx bx-filter"></i>
                    </Button>
                    <Dropdown
                      isOpen={chartState.dropdownOpen}
                      toggle={() =>
                        setChartState({
                          ...chartState,
                          dropdownOpen: !chartState.dropdownOpen,
                        })
                      }
                    >
                      <Button
                        color="light"
                        className="btn-rounded"
                        onClick={() =>
                          setChartState({
                            ...chartState,
                            dropdownOpen: !chartState.dropdownOpen,
                          })
                        }
                      >
                        <i className="bx bx-dots-horizontal-rounded"></i>
                      </Button>
                      <DropdownMenu>
                        <DropdownItem>Refresh</DropdownItem>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Reset Chart</DropdownItem>
                        <DropdownItem>Project Summary Report</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>{" "}
                  </Col>
                </Row>
              </CardTitle>
              {/* Draw chart */}
              <ReactApexChart
                charttype={charttype}
                options={options}
                series={series}
                type={type}
                height={height}
                className="apex-charts"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* Modal filter popup */}
      <Modal
        isOpen={chartState.filterOpen}
        toggle={() =>
          setChartState({
            ...chartState,
            filterOpen: !chartState.filterOpen,
          })
        }
      >
        <ModalHeader
          toggle={() =>
            setChartState({ ...chartState, filterOpen: !chartState.filterOpen })
          }
        >
          Set Filters for Project Summary
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={12}>
              <small>
                <label htmlFor="company">Company</label>
              </small>
            </Col>
            <Col lg={12}>
              <input
                className="form-control"
                type="text"
                value="Vastbit"
                id="company"
                onChange={() => {}}
              />
            </Col>
          </Row>
          <Spacing size={10} />
          <Row>
            <Col lg={12}>
              <small>
                <label htmlFor="isActive">Is Active</label>
              </small>
            </Col>
            <Col lg={12}>
              <select className="form-select" id="isActive">
                <option value={1}>Select</option>
                <option value={2}>Large select</option>
                <option value={3}>Small select</option>
              </select>
            </Col>
          </Row>
          <Spacing size={10} />
          <Row>
            <Col lg={12}>
              <small>
                <label htmlFor="statusType">Status</label>
              </small>
            </Col>
            <Col lg={12}>
              <select className="form-select" id="statusType">
                <option value={1}>Select</option>
                <option value={2}>Large select</option>
                <option value={3}>Small select</option>
              </select>
            </Col>
          </Row>
          <Spacing size={10} />
          <Row>
            <Col lg={12}>
              <small>
                <label htmlFor="projectType">Project Type</label>
              </small>
            </Col>
            <Col lg={12}>
              <select className="form-select" id="priority">
                <option value={1}>Select</option>
                <option value={2}>Large select</option>
                <option value={3}>Small select</option>
              </select>
            </Col>
          </Row>
          <Spacing size={10} />
          <Row>
            <Col lg={12}>
              <small>
                <label htmlFor="priority">Priority</label>
              </small>
            </Col>
            <Col lg={12}>
              <select className="form-select" id="priority">
                <option value={1}>Select</option>
                <option value={2}>Large select</option>
                <option value={3}>Small select</option>
              </select>
            </Col>
          </Row>
          <Spacing size={10} />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() =>
              setChartState({
                ...chartState,
                filterOpen: !chartState.filterOpen,
              })
            }
          >
            Set
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

ChartComponents.propTypes = {
  charttype: PropTypes.string,
  options: PropTypes.object,
  series: PropTypes.array,
  type: PropTypes.string,
  height: PropTypes.number,
};
