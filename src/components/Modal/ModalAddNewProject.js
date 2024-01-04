import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import ModalCommon from "components/Common/ModalCommon";
import InputField from "components/form-control/InputField";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { CommonButton } from "components/Common/ButtonCommon";
import { initializationIndex } from "helpers/erp_helper";
import {
  createProject,
  fetchProject,
} from "redux-toolkit/slices/Projects/project";
import useReuseData from "custom-hook/useReuseData";
export default function ModalAddNewProject(props) {
  const { isOpen, toggle, title } = props;
  const history = useHistory();
  const schema = yup.object({
    projectName: yup.string().required("Please Enter Project Name"),
  });
  const dispatch = useDispatch();
  const { projectList } = useReuseData(fetchProject, "Project");

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
    const payload = {
      ...data,
      status: "open",
      name: `PROJ-000-${initializationIndex(projectList, "name")}`,
    };
    const res = await dispatch(createProject(payload));
    if (res.payload.objectId) {
      await dispatch(fetchProject());
      reset();
      toggle();
    }
  };

  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle={`New ` + title}
        onClose={toggle}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-body">
            <Row>
              <Col>
                <InputField
                  label="Project Name"
                  register={register}
                  required
                  name="projectName"
                  errors={errors}
                />
                <InputField
                  label="From Template"
                  register={register}
                  name="fromTemplate"
                  errors={errors}
                />
                <InputField
                  label="Expected Start Date"
                  register={register}
                  name="expectedStartDate"
                  errors={errors}
                  type="date"
                />
              </Col>
            </Row>
          </div>
          <div className="modal-footer d-flex justify-content-between align-items-center">
            <Link to="project/new-project">
              <CommonButton style={{ margin: 0 }}>
                <i className="bx bx-pencil"></i>
                <span style={{ display: "inline-block", paddingLeft: 10 }}>
                  Edit full page
                </span>
              </CommonButton>
            </Link>
            <div className="modal-footer_left">
              <CommonButton level={0} type="submit">
                Save
              </CommonButton>
            </div>
          </div>
        </form>
      </ModalCommon>
    </React.Fragment>
  );
}

ModalAddNewProject.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
};
