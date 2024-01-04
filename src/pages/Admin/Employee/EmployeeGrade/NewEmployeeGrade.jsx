import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, Container } from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import httpService from "services/httpService";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import ViewableCommon from "components/Common/ViewableCommon";
import VVSTable from "components/form-control/VVSTable";
import RemoveMemberButton from "components/Common/RemoveMemberButton";

const NewEmployeeGrade = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const schema = yup
    .object({
      name: yup.string().required("This field is required!"),
      branch: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Branch",
                objectId: val.objectId,
              }
            : null
        )
        .required("This field is required!"),
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

  const { renderForm } = useGetFormSchema("EmployeeGrade", yup, rest, errors);

  const onSubmit = async values => {
    try {
      const { createdAt, updatedAt, ...employeeGradeValues } = values;
      const employeeGrade = { ...employeeGradeValues };

      if (id) {
        const employeeGradeUrl = `/parse/classes/EmployeeGrade/${id}`;
        await httpService.put(employeeGradeUrl, employeeGrade);
        toastrCRUDSuccess("Employee Group", TEXT_PUT);
        return;
      }

      const employeeGradeUrl = "/parse/classes/EmployeeGrade";
      const res = await httpService.post(employeeGradeUrl, employeeGrade);
      toastrCRUDSuccess("Employee Grade", TEXT_POST);
      history.replace(`/employee-grade/${res.objectId}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getEmployeeGrade = async () => {
    try {
      if (!id) return;

      const { reset } = rest;
      const employeeGradeUrl = `/parse/classes/EmployeeGrade/${id}?include=["branch"]`;
      const employeeGrade = await httpService.get(employeeGradeUrl);
      reset({
        ...employeeGrade,
        createdAt: moment(employeeGrade.createdAt).format("YYYY-MM-DD"),
        updatedAt: moment(employeeGrade.updatedAt).format("YYYY-MM-DD"),
        branch: employeeGrade?.branch
          ? {
              text: employeeGrade.branch.name,
              objectId: employeeGrade.branch.objectId,
              className: "Branch",
              __type: "Pointer",
            }
          : { text: "" },
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getEmployeeGrade();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={id ? "Chi tiết cấp bậc" : "Thêm cấp bậc"}>
            <CommonButton level={0} type="submit">
              Lưu
            </CommonButton>
          </HeaderCreateItem>
          {renderForm()}
        </form>
      </Container>
    </div>
  );
};

export default NewEmployeeGrade;
