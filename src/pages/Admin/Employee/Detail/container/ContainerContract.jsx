import React from "react";
import { Card, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import { CommonText } from "components/Common/TextCommon";
import TableCommon from "components/Common/TableCommon";
import { TABLE_COMMON_CONFIG } from "constants/dataHR";
import FilterTable from "components/Common/FilterTable";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteContract,
  fetchContract,
} from "redux-toolkit/slices/Employee/ContractSlice";
import { updateEmployee } from "redux-toolkit/slices/Employee/EmployeeSlice";

export default function ContainerContract(props) {
  const { onChangeTable, contracts, employees } = props;
  const path = useLocation();
  const dispatch = useDispatch();

  const { objectId, createdAt, updatedAt, ...employeeMap } = employees;

  const handleDetele = async selectedItems => {
    const itemObjectIds = selectedItems.map(item => item.objectId);
    const employeeContractReduce = employeeMap?.contracts.reduce(
      (newArray, item) => {
        if (!itemObjectIds.includes(item.objectId)) {
          newArray.push({
            __type: "Pointer",
            className: "Contract",
            objectId: item.objectId,
          });
        }
        return newArray;
      },
      []
    );

    await dispatch(
      deleteContract({
        itemObjectIds,
        refresh: fetchContract,
      })
    );

    await dispatch(
      updateEmployee([
        {
          contracts: employeeContractReduce,
        },
        objectId,
      ])
    );
  };
  return (
    <React.Fragment>
      <Card body>
        <CommonText level={1} color="black">
          Contract
        </CommonText>
        <Row>
          <Col sm={12}>
            <TableCommon
              columns={TABLE_COMMON_CONFIG.Contract.columns}
              dataTableCommon={[]}
              onHandleChangeTable={onChangeTable}
            />
            <CommonText>Contract List</CommonText>
            <FilterTable
              columnTable={[
                {
                  path: path.pathname.replace("/", ""),
                  columnsPage: [
                    {
                      dataField: "name",
                      text: "Name",
                    },
                    {
                      dataField: "startDate",
                      text: "Start Date",
                    },
                    {
                      dataField: "endDate",
                      text: "End Date",
                    },
                    {
                      dataField: "company.name",
                      text: "Company",
                    },
                    {
                      dataField: "attachment",
                      text: "Attachment",
                    },
                  ],
                },
              ]}
              dataTable={contracts || []}
              dataFilterTable={[
                {
                  id: "",
                  isFilterDate: false,
                  isFilterSearch: false,
                },
              ]}
              onDelete={handleDetele}
            />
          </Col>
        </Row>
      </Card>
    </React.Fragment>
  );
}

ContainerContract.propTypes = {
  onChangeTable: PropTypes.func,
  contracts: PropTypes.array,
  employees: PropTypes.object,
};
