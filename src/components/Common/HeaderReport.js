import React from "react";
import { Row } from "reactstrap";
import PropTypes from "prop-types";
import { BreadCrumbs } from "./Breadcrumbs";
import { CommonButton } from "./ButtonCommon";
import Spacer from "./Spacing";
import * as XLSX from "xlsx";
// import ReactHtmlTableToExcel from "react-html-table-to-excel";
import RefreshIcon from "components/Icon/RefreshIcon";
export default function HeaderCreateItem(props) {
  const { title, data } = props;

  return (
    <Row>
      <div
        className="d-flex align-items-center justify-content-between"
        style={{ gap: 10 }}
      >
        <h4 className="mb-0 font-size-18 text-capitalize">{title}</h4>
        <div className="d-flex ">
          <CommonButton onClick={() => window.location.reload()}>
            <RefreshIcon />
          </CommonButton>
          <Spacer size={16} />
          {/* <ReactHtmlTableToExcel
            id="test-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Export"
            className="btn btn-primary"
          /> */}
        </div>
      </div>
    </Row>
  );
}

HeaderCreateItem.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  saved: PropTypes.bool,
  source: PropTypes.string,
  data: PropTypes.array,
};
