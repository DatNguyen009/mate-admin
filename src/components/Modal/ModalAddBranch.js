import { yupResolver } from "@hookform/resolvers/yup";
import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import InputField from "components/form-control/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { options } from "helpers/erp_helper";
import { addBranch } from "redux-toolkit/slices/Branch/BranchSlide";
import { useDispatch } from "react-redux";
const INITIAL_BRANCH = {
  branch: "",
  name: "",
};

export default function ModalAddBranch(props) {
  const dispatch = useDispatch();
  const { isOpen, toggle, title } = props;
  const modalTitle = "New " + title.replaceAll("-", " ");
  const schema = yup
    .object({
      branch: yup.string().required("Please enter branch"),
      name: yup.string().required("Please enter Name"),
    })
    .required();
  toastr.options = options;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    INITIAL_BRANCH,
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    dispatch(addBranch(data));
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
              label="Branch"
              register={register}
              required
              name="branch"
              errors={errors}
            />
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

ModalAddBranch.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};
