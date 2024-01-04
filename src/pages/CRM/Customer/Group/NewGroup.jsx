import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, Container } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import httpService from "services/httpService";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import VVSTable from "components/form-control/VVSTable";
import ViewableCommon from "components/Common/ViewableCommon";

const NewCustomerGroup = () => {
  const { id } = useParams();
  const history = useHistory();

  const schema = yup
    .object({
      name: yup.string().required("Vui lòng không được để trống tên!"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("CustomerGroup", yup, rest, errors);

  const onSubmit = async values => {
    try {
      const { createdAt, updatedAt, ...customerGroupValues } = values;
      const customerGroup = { ...customerGroupValues };
      if (id) {
        const customerGroupUrl = `/parse/classes/CustomerGroup/${id}`;
        await httpService.put(customerGroupUrl, customerGroup);
        toastrCRUDSuccess("Employee Group", TEXT_PUT);
        return;
      }
      const customerGroupUrl = "/parse/classes/CustomerGroup";
      const res = await httpService.post(customerGroupUrl, customerGroup);
      toastrCRUDSuccess("Customer Group", TEXT_POST);
      history.replace(`/customer-group/${res.objectId}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCustomerGroup = async () => {
    try {
      if (!id) return;

      const { reset } = rest;
      const customerGroup = await httpService.get(
        `/parse/classes/CustomerGroup/${id}`
      );
      reset({
        ...customerGroup,
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const beforeSaveInlineEdit = async row => {
    const updateEmployeeUrl = `/parse/classes/Customer/${row.objectId}`;
    const updateEmployeeBody = {
      group: { __type: "Pointer", className: "CustomerGroup", objectId: id },
    };
    httpService.put(updateEmployeeUrl, updateEmployeeBody);
  };

  useEffect(() => {
    getCustomerGroup();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem
            title={id ? "Chi tiết nhóm khách hàng" : "Thêm nhóm khách hàng"}
          >
            <CommonButton level={0} type="submit">
              Lưu
            </CommonButton>
          </HeaderCreateItem>
          {renderForm([])}
          <ViewableCommon
            if={() => id}
            caseTrue={
              <Card body>
                <VVSTable
                  title="Danh sách thành viên trong nhóm"
                  name="CustomerGroupMembers"
                  enableInlineEdit
                  className="m-0 p-0"
                  beforeSaveInlineEdit={beforeSaveInlineEdit}
                  whereQuery={{
                    group: {
                      __type: "Pointer",
                      className: "CustomerGroup",
                      objectId: id,
                    },
                  }}
                />
              </Card>
            }
          />
        </form>
      </Container>
    </div>
  );
};

export default NewCustomerGroup;
