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
import {
  createProjectType,
  fetchProjectType,
} from "redux-toolkit/slices/Projects/projectType";
import { Link, useHistory } from "react-router-dom";

export default function ModalAddNewProjectType(props) {
  const dispatch = useDispatch();
  const { isOpen, toggle, title } = props;
  const modalTitle = "New " + title.replaceAll("-", " ");
  const history = useHistory();
  const schema = yup
    .object({
      name: yup.string().required("Please Enter Project Type"),
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
  const onSubmit = async data => {
    const res = await dispatch(createProjectType(data));
    if (res.payload.objectId) {
      dispatch(fetchProjectType());
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
              label="Project Type"
              register={register}
              required
              name="name"
              errors={errors}
            />
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <Link to="project-type/new-project-type">
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

ModalAddNewProjectType.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};
