import React from "react";
import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import * as yup from "yup";

import { CommonButton } from "components/Common/ButtonCommon";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEmployeeGroup } from "redux-toolkit/slices/Employee/EmployeeGroupSlide";
import InputField from "components/form-control/InputField";
export default function ModalAddEmployeeGroup(props) {
  const { isOpen, toggle, title } = props;
  const dispatch = useDispatch();
  const modalTitle = "New " + title.replaceAll("-", " ");
  const initialEmployeeGroup = {
    name: "",
  };
  const schema = yup
    .object({
      name: yup.string().required("Please enter Name"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    initialEmployeeGroup,
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(createEmployeeGroup(data));
    reset();
    toggle();
  };
  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle={modalTitle}
        onClose={toggle}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <InputField
              label="Name"
              register={register}
              required
              name="name"
              errors={errors}
            />
          </div>
          <div className="modal-footer">
            <CommonButton type="submit" level={0}>
              Save
            </CommonButton>
          </div>
        </form>
      </ModalCommon>
    </React.Fragment>
  );
}

ModalAddEmployeeGroup.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};
