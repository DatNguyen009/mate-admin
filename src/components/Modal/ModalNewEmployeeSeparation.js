import React from "react";

import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import { CommonField, CommonLabel } from "components/Common/inputCommon";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { CommonButton } from "components/Common/ButtonCommon";
import { Col, ModalBody, ModalFooter, Row } from "reactstrap";
import InputField from "components/form-control/InputField";
import SelectField from "components/form-control/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useReuseData from "custom-hook/useReuseData";
import { fetchCompany } from "redux-toolkit/slices/Company/CompanySlide";
import { fetchEmployee } from "redux-toolkit/slices/Employee/EmployeeSlice";
import { checkError, checkExistItem, getSeries } from "helpers/erp_helper";
import {
  createEmployeeSeparation,
  fetchEmployeeSeparation,
} from "redux-toolkit/slices/Employee/EmployeeSeparation/EmployeeSeparationSlice";
import { useDispatch } from "react-redux";

const INITIAL_EMPLOYEE_SEPARATION = {
  employee: "",
  status: "",
  company: "",
};

const STATUS_OPTIONS = [
  { index: 0, name: "", value: "" },
  { index: 1, name: "Pending", value: "Pending" },
  { index: 2, name: "In Process", value: "InProcess" },
  { index: 3, name: "Completed", value: "Completed" },
];
export default function ModalNewEmployeeSeparation(props) {
  const { companys } = useReuseData(fetchCompany, "Company");
  const { employees } = useReuseData(fetchEmployee, "Employee");
  const { employeeSeparations } = useReuseData(
    fetchEmployeeSeparation,
    "EmployeeSeparation"
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const { isOpen, toggle, title } = props;
  const modalTitle = "New " + title.replaceAll("-", " ");
  const schema = yup
    .object({
      employee: yup
        .string()
        .required("Please Enter Employee")
        .test("text", "This Employee is not existed!", value =>
          checkExistItem(employees, "series", value)
        ),
      company: yup
        .string()
        .required("Please Enter Company")
        .test("text", "This Company is not existed!", value =>
          checkExistItem(companys, "name", value)
        ),
      status: yup.string().required("Please Enter Status"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    INITIAL_EMPLOYEE_SEPARATION,
    resolver: yupResolver(schema),
  });

  const onSubmit = async values => {
    const employeeSelected = employees.find(e => e.series === values.employee);
    const companySelected = companys.find(c => c.name === values.company);

    const series = getSeries(employeeSeparations, "HR-EMP-SEP");

    const newEmployeeSeparation = {
      ...values,
      series,

      employee: {
        objectId: employeeSelected?.objectId,
        __type: "Pointer",
        className: "Employee",
      },

      company: {
        objectId: companySelected?.objectId,
        __type: "Pointer",
        className: "Company",
      },
    };
    const response = await dispatch(
      createEmployeeSeparation(newEmployeeSeparation)
    ).unwrap();
    dispatch(fetchEmployeeSeparation());
    history.push(`/employee-separation/${series}`, {
      infor: response,
      from: "toCreate",
    });
  };
  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle={modalTitle}
        onClose={toggle}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Row>
              <InputField
                label="Employee"
                name="employee"
                register={register}
                errors={errors}
                required
                list="employeeList"
                listData={employees}
                titleSelect="series"
                autoComplete
              />
              <InputField
                label="Company"
                name="company"
                register={register}
                errors={errors}
                required
                list="companyList"
                listData={companys}
                titleSelect="name"
                autoComplete
              />
              <SelectField
                label="Status"
                name="status"
                register={register}
                errors={errors}
                options={STATUS_OPTIONS}
                required
              />
            </Row>
          </ModalBody>
          <ModalFooter>
            <div className="d-flex justify-content-between">
              <Link to="employee-separation/new-employee-separation">
                <CommonButton style={{ margin: 0 }}>
                  <i className="bx bx-pencil"></i>
                  <span style={{ display: "inline-block", paddingLeft: 10 }}>
                    Edit full page
                  </span>
                </CommonButton>
              </Link>

              <CommonButton
                level={0}
                disabled={checkError(errors, ["company", "employee"])}
              >
                Save
              </CommonButton>
            </div>
          </ModalFooter>
        </form>
      </ModalCommon>
    </React.Fragment>
  );
}

ModalNewEmployeeSeparation.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};
