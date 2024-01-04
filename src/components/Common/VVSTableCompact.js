import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
export default function VVSTableCompact(props) {
  const { modelName, dataCol } = props;
  const tblCols = TABLE_CONFIG_REPORT[modelName].columns;

  return (
    <React.Fragment>
      <Row>
        <Col md="12">
          <Card body>
            <div style={{ overflowY: "scroll", height: 600 }}>
              <table
                className="table  align-middle table-nowrap table-hover"
                id="table-to-xls"
              >
                <thead className="table-light">
                  <tr>
                    <th width="50">STT</th>
                    {tblCols.map((col, index) => (
                      <th key={index} tabIndex="0">
                        {col.text}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataCol.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {tblCols.map(col => (
                        <td key={col.field + index}>
                          <span>{_.get(row, col.field)}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

VVSTableCompact.propTypes = {
  modelName: PropTypes.string,
  dataCol: PropTypes.array,
};
