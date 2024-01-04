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
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  createTaskType,
  fetchTaskTypes,
} from "redux-toolkit/slices/Projects/taskType";

export default function ModalAddNewTaskType(props) {
  const { isOpen, toggle, title } = props;

  const modalTitle = "New " + title.replaceAll("-", " ");

  const dispatch = useDispatch();

  const schema = yup
    .object({
      name: yup.string().required("Please Enter Name"),
    })
    .required();
  toastr.options = options;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async values => {
    const result = await dispatch(createTaskType(values)).unwrap();
    if (result.objectId) {
      dispatch(fetchTaskTypes());
    }
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
              autoComplete
            />
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <Link to="task-type/new-task-type">
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
    </React.Fragment>
  );
}

ModalAddNewTaskType.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};
