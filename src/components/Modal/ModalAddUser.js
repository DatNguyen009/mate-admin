import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { CommonButton } from "components/Common/ButtonCommon";
import {
  ComponentCheckbox,
  LabelCheckbox,
} from "components/Common/inputCommon";
import ModalCommon from "components/Common/ModalCommon";
import InputField from "components/form-control/InputField";
import SelectField from "components/form-control/Select";
import PropTypes from "prop-types";
import { checkExistItem } from "helpers/erp_helper";
import { addUser, fetchUsers } from "redux-toolkit/slices/Users/userSlice";
import useReuseData from "custom-hook/useReuseData";

const USER_TYPE_OPTIONS = [
  { index: 1, name: "System User", value: "System User" },
  { index: 2, name: "Employee Self Service", value: "Employee Self Service" },
  { index: 3, name: "Website User", value: "Website User" },
];

const ModalAddUser = props => {
  const { isOpen, toggle, title } = props;
  const modalTitle = "New " + title.replaceAll("-", " ");

  const { users } = useReuseData(fetchUsers, "User");

  const dispatch = useDispatch();

  const schema = yup
    .object({
      username: yup
        .string()
        .required("Please enter email")
        .test(
          "text",
          "This username already exists",
          value => !checkExistItem(users, "username", value)
        ),
      firstName: yup.string().required("Please enter first name"),
      password: yup.string().required("Please enter password"),
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
      sendWelcomeEmail: true,
      lastName: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async values => {
    const user = {
      ...values,
      fullName: (values.firstName + " " + values.lastName).trim(),
      avatar: "",
    };
    await dispatch(addUser(user));
    dispatch(fetchUsers());
    reset();
    toggle();
  };

  return (
    <ModalCommon isShowModal={isOpen} modalTitle={modalTitle} onClose={toggle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <InputField
            label="Username"
            register={register}
            required
            name="username"
            errors={errors}
          />
          <InputField
            label="Password"
            register={register}
            required
            name="password"
            errors={errors}
          />
          <InputField
            label="Last Name"
            register={register}
            name="lastName"
            errors={errors}
          />
          <InputField
            label="First Name"
            register={register}
            required
            name="firstName"
            errors={errors}
          />
          <ComponentCheckbox className="form-label">
            <input
              type="checkbox"
              {...register("sendWelcomeEmail")}
              id="send-welcome-email-checkbox"
            />
            <LabelCheckbox
              className="form-label"
              for="send-welcome-email-checkbox"
            >
              Send Welcome Email
            </LabelCheckbox>
          </ComponentCheckbox>
          <SelectField
            label="User Type"
            register={register}
            name="userType"
            errors={errors}
            options={USER_TYPE_OPTIONS}
          />
        </div>
        <div className="modal-footer">
          <CommonButton type="submit" level={0}>
            Save
          </CommonButton>
        </div>
      </form>
    </ModalCommon>
  );
};

ModalAddUser.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};

export default ModalAddUser;
