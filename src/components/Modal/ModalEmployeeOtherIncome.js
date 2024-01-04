import React from "react";
import ModalCommon from "components/Common/ModalCommon";
import PropTypes from "prop-types";
import { CommonButton } from "components/Common/ButtonCommon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import InputField from "components/form-control/InputField";
import useReuseData from "custom-hook/useReuseData";
import { fetchCompany } from "redux-toolkit/slices/Company/CompanySlide";
import { fetchPayrollPeriod } from "redux-toolkit/slices/Payroll/PayrollPeriod/payrollPeriod";
import { Link } from "react-router-dom";
import { fetchEmployee } from "redux-toolkit/slices/Employee/EmployeeSlice";
import {
  createEmployeeOtherIncome,
  fetchEmployeeOtherIncome,
} from "redux-toolkit/slices/Payroll/EmployeeOtherIncome/employeeOtherIncome";
import { checkExistItem, initializationIndex } from "helpers/erp_helper";

export default function ModalEmployeeOtherIncome(props) {
  const { isShowModal, modalTitle, onCloseModal } = props;
  const dispatch = useDispatch();

  const { companys } = useReuseData(fetchCompany, "Company");
  const { employees } = useReuseData(fetchEmployee, "Employee");
  const { payrollPeriod } = useReuseData(fetchPayrollPeriod, "PayrollPeriod");
  const { employeeOtherIncome = [] } = useReuseData(
    fetchEmployeeOtherIncome,
    "EmployeeOtherIncome"
  );

  const schema = yup
    .object({
      payrollPeriod: yup
        .string()
        .required("Please Enter Payroll Period")
        .test("text", "This Payroll Period is not existed!", value =>
          checkExistItem(payrollPeriod, "payrollPeriodName", value)
        ),
      company: yup
        .string()
        .required("Please Enter Company")
        .test("text", "This Company is not existed!", value =>
          checkExistItem(companys, "name", value)
        ),
      employee: yup
        .string()
        .required("Please Enter Employee")
        .test("text", "This employee is not existed!", value =>
          checkExistItem(employees, "employeeId", value)
        ),
      amount: yup
        .number()
        .typeError("Amount should be numeric")
        .required("Please Enter Amount"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      payrollPeriod: "",
      company: "",
      employee: "",
      amount: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    const companySelected = companys.find(comp => comp.name === data.company);

    const employeeSelected = employees.find(
      emp => emp.employeeId === data.employee
    );

    const payrollPeriodSelected = payrollPeriod.find(
      payrollPeriod => payrollPeriod.payrollPeriodName === data.payrollPeriod
    );

    const index = initializationIndex(employeeOtherIncome, "name");

    const payload = {
      ...data,
      company: {
        objectId: companySelected?.objectId,
        __type: "Pointer",
        className: "Company",
      },
      payrollPeriod: {
        objectId: payrollPeriodSelected?.objectId,
        __type: "Pointer",
        className: "PayrollPeriod",
      },

      employee: {
        objectId: employeeSelected?.objectId,
        __type: "Pointer",
        className: "Employee",
      },
      name: "HR-INCOME-" + index,
    };

    dispatch(createEmployeeOtherIncome(payload));
    dispatch(fetchEmployeeOtherIncome());
    reset();
    onCloseModal();
  };

  return (
    <ModalCommon
      modalTitle={modalTitle}
      isShowModal={isShowModal}
      onClose={onCloseModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <InputField
            label="Employee"
            register={register}
            required
            name="employee"
            errors={errors}
            list="employeeList"
            listData={employees}
            titleSelect="employeeId"
            autoComplete
          />
          <InputField
            label="Payroll Period Name"
            register={register}
            required
            name="payrollPeriod"
            errors={errors}
            list="payrollPeriodList"
            listData={payrollPeriod}
            titleSelect="payrollPeriodName"
            autoComplete
          />
          <InputField
            label="Company"
            register={register}
            name="company"
            errors={errors}
            required
            list="companyList"
            listData={companys}
            titleSelect="name"
            autoComplete
          />
          <InputField
            label="Amount"
            register={register}
            required
            name="amount"
            errors={errors}
            type="number"
            autoComplete
          />
        </div>
        <div className="modal-footer d-flex justify-content-between">
          <Link to="employee-other-income/new-employee-other-income">
            <CommonButton style={{ margin: 0 }}>
              <i className="bx bx-pencil"></i>
              <span style={{ display: "inline-block", paddingLeft: 10 }}>
                Edit full page
              </span>
            </CommonButton>
          </Link>
          <CommonButton level={0} className=" text-capitalize" type="submit">
            Save
          </CommonButton>
        </div>
      </form>
    </ModalCommon>
  );
}

ModalEmployeeOtherIncome.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
};
