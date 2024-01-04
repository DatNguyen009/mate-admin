import React, { useState, useLayoutEffect } from "react";
import ModalCommon from "components/Common/ModalCommon";
import PropTypes from "prop-types";
import { CommonButton } from "components/Common/ButtonCommon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-control/InputField";
import { Col, Row } from "reactstrap";
import AvatarCommon from "components/Common/AvatarCommon";
import Spacer from "components/Common/Spacing";
import { checkExistItem } from "helpers/erp_helper";

export default function ModalAssignment(props) {
  const { isOpenModal, onCloseModal, users, onChange, assignees } = props;
  const [selectedAssignees, setSelectedAssignees] = useState([]);

  useLayoutEffect(() => {
    setSelectedAssignees(assignees);
  }, [JSON.stringify(assignees)]);

  const schema = yup
    .object({
      assignUser: yup
        .string()
        .test("text", "This User is not existed!", value =>
          checkExistItem(users, "username", value)
        ),
    })
    .required();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = values => {
    const selectedAssignee = users.find(
      user => user.username === values.assignUser
    );

    const assignees = [...selectedAssignees, selectedAssignee];
    setSelectedAssignees(assignees);
    onChange(assignees);
    reset();
    onCloseModal();
  };

  const handleRemoveAssignee = removedAssignee => {
    const selectedAssignees = assignees.filter(
      assignee => assignee.objectId !== removedAssignee.objectId
    );
    setSelectedAssignees(selectedAssignees);
    onChange(selectedAssignees);
  };

  return (
    <ModalCommon
      modalTitle="Assignments"
      isShowModal={isOpenModal}
      onClose={onCloseModal}
    >
      <form>
        <div className="modal-body">
          <InputField
            label="Assign a user"
            register={register}
            name="assignUser"
            autoComplete
            list="users"
            listData={users}
            titleSelect="username"
            errors={errors}
          />
          <Spacer size={10} />
          {selectedAssignees?.map((assignee, index) => (
            <Row className="flex-grow-1 mb-1 p-1" key={index}>
              <Col xs={12} className="d-flex align-items-center">
                <AvatarCommon
                  config={{ size: 32, borderWidth: 2, circle: true }}
                  src="https://picsum.photos/200/300"
                />
                <Spacer size={14} />
                <div>{assignee.username}</div>
                <div style={{ flexGrow: 1 }} />
                <CommonButton
                  type="button"
                  height={24}
                  level={2}
                  onClick={() => {
                    handleRemoveAssignee(assignee);
                  }}
                >
                  <i className="dripicons-trash"></i>
                </CommonButton>
              </Col>
            </Row>
          ))}
        </div>
        <div className="modal-footer">
          <CommonButton
            level={0}
            className=" text-capitalize"
            type="button"
            onClick={e => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            Assign
          </CommonButton>
        </div>
      </form>
    </ModalCommon>
  );
}

ModalAssignment.propTypes = {
  isOpenModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  users: PropTypes.array,
  onChange: PropTypes.func,
  assignees: PropTypes.array,
};
