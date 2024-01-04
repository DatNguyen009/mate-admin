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
import {
  createPayrollPeriod,
  fetchPayrollPeriod,
} from "redux-toolkit/slices/Payroll/PayrollPeriod/payrollPeriod";
import { Link } from "react-router-dom";
import { checkExistItem } from "helpers/erp_helper";

export default function ModalNewPayrollPeriod(props) {
  const { isShowModal, modalTitle, onCloseModal } = props;
  const dispatch = useDispatch();

  const { companys } = useReuseData(fetchCompany, "Company");
  const { payrollPeriod } = useReuseData(fetchPayrollPeriod, "PayrollPeriod");

  const schema = yup
    .object({
      payrollPeriodName: yup
        .string()
        .required("Please Enter Name")
        .test(
          "text",
          "This name already exists. Select another name",
          value => !checkExistItem(payrollPeriod, "payrollPeriodName", value)
        ),
      company: yup
        .string()
        .required("Please Enter Company")
        .test("text", "This Company is not existed!", value =>
          checkExistItem(companys, "name", value)
        ),
      startDate: yup.string().required("Please Enter Your Start Date"),
      endDate: yup.string().required("Please Enter Your End Date"),
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
      payrollPeriodName: "",
      company: "",
      startDate: "",
      endDate: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    dispatch(createPayrollPeriod(data));
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
            label="Payroll Period Name"
            register={register}
            required
            name="payrollPeriodName"
            errors={errors}
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
            label="Start Date"
            register={register}
            required
            name="startDate"
            errors={errors}
            type="date"
          />
          <InputField
            label="End Date"
            register={register}
            required
            name="endDate"
            errors={errors}
            type="date"
          />
        </div>
        <div className="modal-footer d-flex justify-content-between">
          <Link to="payroll-period/new-payroll-period">
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

ModalNewPayrollPeriod.propTypes = {
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseModal: PropTypes.func,
};
