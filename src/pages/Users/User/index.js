import React from "react";
import { Container } from "reactstrap";
import { useDispatch } from "react-redux";

import FilterTable from "components/Common/FilterTable";
import SubHeaderProject from "components/Common/SubHeaderProjects";
import {
  COLUMNS_TABLE,
  DATA_DROPDOWN_LISTVIEW_CRM,
  DATA_DROPDOWN_MENU_CRM,
  DATA_FILTER_TABLE,
} from "constants/dataUsers";
import useReuseData from "custom-hook/useReuseData";
import { deleteUser, fetchUsers } from "redux-toolkit/slices/Users/userSlice";

const User = () => {
  const dispatch = useDispatch();

  const { users } = useReuseData(fetchUsers, "User");

  const handleDeleteUser = usersSelected => {
    const itemObjectIds = usersSelected.map(item => item.objectId);
    dispatch(deleteUser({ itemObjectIds, refresh: fetchUsers }));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <SubHeaderProject
            listView={DATA_DROPDOWN_LISTVIEW_CRM}
            listMenu={DATA_DROPDOWN_MENU_CRM}
          />
          <FilterTable
            dataFilterTable={DATA_FILTER_TABLE}
            dataTable={users || []}
            columnTable={COLUMNS_TABLE}
            onDelete={handleDeleteUser}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default User;
