import SubHeaderProject from "components/Common/SubHeaderProjects";
import {
  DATA_DROPDOWN_LISTVIEW_PROJECT,
  DATA_DROPDOWN_MENU_PROJECT,
} from "constants/dataProject";
import useReuseData from "custom-hook/useReuseData";
import React from "react";
import { Container } from "reactstrap";
import { fetchSysCfg } from "redux-toolkit/slices/SysCfgSlice/SysCfgSlice";
import FilterTable from "../../../components/Common/FilterTable";
import { COLUMNS_TABLE, DATA_FILTER_TABLE } from "../../../constants/dataHR";

export default function EmploymentType() {
  const { employmentType } = useReuseData(fetchSysCfg, "SysCfgToolkit");

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
            dataTable={employmentType || []}
            columnTable={COLUMNS_TABLE}
          />
        </Container>
      </div>
    </React.Fragment>
  );
}
