import React from "react";
import { Container } from "reactstrap";
import FilterTable from "components/Common/FilterTable";
import {
  DATA_FILTER_TABLE,
  COLUMNS_TABLE,
  DATA_TIMESHEET,
  DATA_DROPDOWN_LISTVIEW_TIMESHEET,
  DATA_DROPDOWN_MENU_PROJECT,
} from "../../../constants/dataProject";
import SubHeaderProject from "components/Common/SubHeaderProjects";
TimeSheet.propTypes = {};

function TimeSheet(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <SubHeaderProject
            listView={DATA_DROPDOWN_LISTVIEW_TIMESHEET}
            listMenu={DATA_DROPDOWN_MENU_PROJECT}
          />
          <FilterTable
            dataFilterTable={DATA_FILTER_TABLE}
            dataTable={DATA_TIMESHEET}
            columnTable={COLUMNS_TABLE}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}

export default TimeSheet;
