import React from "react";
import { useEffect, useState } from "react";
import { Card, Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import httpService from "services/httpService";
import VVSTable from "components/form-control/VVSTable";
import { GET_CURRENT_USER } from "helpers/url_helper";
import { useLocation } from "react-router-dom";
import { CommonText } from "components/Common/TextCommon";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import toastr from "toastr";
import { useForm } from "react-hook-form";
import Clock from "components/Common/Clock";
import { BreadCrumbs } from "components/Common/Breadcrumbs";
import { CommonButton } from "components/Common/ButtonCommon";
import PropTypes from "prop-types";
const PrintReportButton = props => {
  const { getValues, selectedRows } = props;
  const handleOnClick = () => {
    console.log(getValues());
    console.log(selectedRows);
  };
  return (
    <CommonButton level={4} onClick={handleOnClick}>
      In báo cáo
    </CommonButton>
  );
};
export default function StockReport() {
  const formProps = useForm({
    defaultValues: {
      warehouse: {
        name: "",
        objectId: "",
      },
    },
  });
  const { watch } = formProps;
  const warehouseId = watch("warehouse.objectId");
  const whereQuery = warehouseId
    ? {
        warehouse: {
          __type: "Pointer",
          className: "WareHouse",
          objectId: warehouseId,
        },
      }
    : { warehouse: null };
  const renderSelectWarehouse = () => {
    return (
      <div className="d-flex align-items-center">
        <CommonText level={1} className="my-0 me-3">
          Chọn kho:
        </CommonText>
        <VVSSelectModel
          name="warehouse.name"
          model="WareHouse"
          errors={formProps.formState.errors}
          {...formProps}
          placeholder="Toàn bộ"
        />
      </div>
    );
  };
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumbs />
        <h4 className="font-size-18 text-capitalize">Báo cáo kho</h4>
        <Card body>
          <VVSTable
            name="stock-report"
            whereQuery={whereQuery}
            disableAdd
            disableDelete
            helperButtons={[{ component: PrintReportButton }]}
            title={renderSelectWarehouse()}
            className="p-0"
          />
        </Card>
      </Container>
    </div>
  );
}
PrintReportButton.propTypes = {
  getValues: PropTypes.func,
  selectedRows: PropTypes.object,
};
