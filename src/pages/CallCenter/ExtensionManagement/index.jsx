import React from "react";
import { Container } from "reactstrap";

import VVSTable from "components/form-control/VVSTable";
import httpService from "services/httpService";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { language_vn } from "helpers/language_vn";

const ExtensionManagement = () => {
  const beforeSaveInlineEdit = async row => {
    try {
      const { extension, objectId } = row;
      const res = await httpService.put(`/parse/classes/Employee/${objectId}`, {
        extension,
      });
      if (res?.updatedAt) {
        toastrSuccessAlert("Cập nhật Extention thành công!!!");
        return;
      }
      toastrErrorAlert(language_vn.error);
    } catch (error) {
      toastrErrorAlert(language_vn.error);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          name="ExtensionManagement"
          title="Quản lý extention"
          enableInlineEdit
          disableAdd
          beforeSaveInlineEdit={beforeSaveInlineEdit}
        />
      </Container>
    </div>
  );
};

export default ExtensionManagement;
