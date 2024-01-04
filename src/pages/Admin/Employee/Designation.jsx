import SubHeaderProject from "components/Common/SubHeaderProjects";
import React from "react";
import { Container } from "reactstrap";
import FilterTable from "../../../components/Common/FilterTable";
import {
  COLUMNS_TABLE,
  DATA_FILTER_TABLE,
  DATA_DESIGNATION,
} from "../../../constants/dataHR";
import {
  DATA_DROPDOWN_LISTVIEW_PROJECT,
  DATA_DROPDOWN_MENU_PROJECT,
} from "constants/dataProject";
export default function Designation() {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <SubHeaderProject
            listView={DATA_DROPDOWN_LISTVIEW_PROJECT}
            listMenu={DATA_DROPDOWN_MENU_PROJECT}
          />
          <FilterTable
            dataFilterTable={DATA_FILTER_TABLE}
            dataTable={DATA_DESIGNATION}
            columnTable={COLUMNS_TABLE}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
