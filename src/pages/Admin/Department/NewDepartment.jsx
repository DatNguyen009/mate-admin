import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, Container } from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import ViewableCommon from "components/Common/ViewableCommon";
import VVSTable from "components/form-control/VVSTable";
import httpService from "services/httpService";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";
import moment from "moment";
// import RemoveMemberButton from "../../../components/Common/RemoveMemberButton";

const NewDepartment = () => {
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
      leader: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Employee",
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

  const { renderForm } = useGetFormSchema("Department", yup, rest, errors);

  const onSubmit = async values => {
    try {
      const { createdAt, updatedAt, ...departmentValues } = values;
      const department = { ...departmentValues };

      if (id) {
        const departmentUrl = `/parse/classes/Department/${id}`;
        await httpService.put(departmentUrl, department);
        toastrCRUDSuccess("Department", TEXT_PUT);
        return;
      }

      const departmentUrl = "/parse/classes/Department";
      const res = await httpService.post(departmentUrl, department);
      toastrCRUDSuccess("Department", TEXT_POST);
      history.replace(`/department/${res.objectId}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getDepartment = async () => {
    try {
      if (!id) return;

      const { reset } = rest;
      const departmentUrl = `/parse/classes/Department/${id}?include=["leader","branch"]`;
      const department = await httpService.get(departmentUrl);
      reset({
        ...department,
        createdAt: moment(department.createdAt).format("YYYY-MM-DD"),
        updatedAt: moment(department.updatedAt).format("YYYY-MM-DD"),
        branch: department?.branch
          ? {
              text: department.branch.name,
              objectId: department.branch.objectId,
              className: "Branch",
              __type: "Pointer",
            }
          : { text: "" },
        leader: department?.leader
          ? {
              text: department.leader.fullName,
              objectId: department.leader.objectId,
              className: "Employee",
              __type: "Pointer",
            }
          : { text: "" },
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const beforeSaveInlineEdit = row => {
    const updateEmployeeUrl = `/parse/classes/Employee/${row.objectId}`;
    const updateEmployeeBody = {
      department: { __type: "Pointer", className: "Department", objectId: id },
    };
    httpService.put(updateEmployeeUrl, updateEmployeeBody);
  };

  const includeProps = {
    leader: {
      conditionField: {
        position: "leader",
      },
    },
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={id ? "Chi tiết Bộ Phận" : "Thêm bộ phận"}>
            <CommonButton level={0} type="submit">
              Lưu
            </CommonButton>
          </HeaderCreateItem>
          {renderForm([], includeProps)}
          <ViewableCommon
            if={() => id}
            caseTrue={
              <Card body>
                <VVSTable
                  title="Danh sách thành viên trực thuộc"
                  name="DepartmentMembers"
                  enableInlineEdit
                  disableDelete
                  className="m-0 p-0"
                  beforeSaveInlineEdit={beforeSaveInlineEdit}
                  // helperButtons={[
                  //   {
                  //     component: RemoveMemberButton,
                  //     onlyInEditMode: true,
                  //     componentProps: { removeField: "department" },
                  //   },
                  // ]}
                  whereQuery={{
                    department: {
                      __type: "Pointer",
                      className: "Department",
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

export default NewDepartment;
