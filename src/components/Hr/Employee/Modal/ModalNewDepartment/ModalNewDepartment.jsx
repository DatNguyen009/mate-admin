import React from "react";
import ModalCommon from "components/Common/ModalCommon";
import { Col, ModalBody, Row, ModalFooter } from "reactstrap";
import { ComponentCheckbox } from "components/Common/inputCommon";
import * as yup from "yup";
import PropTypes from "prop-types";
import { CommonButton } from "components/Common/ButtonCommon";
import { CommonText } from "components/Common/TextCommon";
import InputField from "components/form-control/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addDepartment,
  fetchDepartments,
  updateDepartment,
} from "redux-toolkit/slices/Department/DepartmentSlide";
import { useDispatch } from "react-redux";

export default function ModalNewDepartment(props) {
  const { isOpen, title, toggle, nodeParent, onChange, company } = props;
  const dispatch = useDispatch();
  const initialDepartment = {
    isGroup: "",
    name: "",
  };
  const schema = yup
    .object({
      name: yup.string().required("Please Enter Your Department Name"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    initialDepartment,
    resolver: yupResolver(schema),
  });
  const onSubmit = async values => {
    const newDepartment = {
      ...values,
      company: {
        objectId: company?.objectId,
        __type: "Pointer",
        className: "Company",
      },
      ...(nodeParent && {
        nodeParent: [
          {
            objectId: nodeParent?.objectId,
            __type: "Pointer",
            className: "Account",
          },
        ],
      }),
    };

    const res = await dispatch(addDepartment(newDepartment));
    if (!nodeParent?.nodeChild) {
      await dispatch(
        updateDepartment({
          dataItem: {
            nodeChild: [
              {
                objectId: res?.payload?.objectId,
                __type: "Pointer",
                className: "Department",
              },
            ],
          },
          dataId: nodeParent?.objectId,
        })
      );
      const departments = await dispatch(fetchDepartments());
      onChange(departments?.payload);
      toggle();
      reset();
      return;
    }

    if (nodeParent?.nodeChild) {
      const nodeChildMap = nodeParent.nodeChild.map(item => {
        return {
          objectId: item.objectId,
          __type: "Pointer",
          className: "Department",
        };
      });
      nodeChildMap.push({
        objectId: res?.payload?.objectId,
        __type: "Pointer",
        className: "Department",
      });
      await dispatch(
        updateDepartment({
          dataItem: {
            nodeChild: nodeChildMap,
          },
          dataId: nodeParent?.objectId,
        })
      );
      const departments = await dispatch(fetchDepartments());
      onChange(departments?.payload);
      toggle();
      reset();
      return;
    }
  };
  return (
    <ModalCommon isShowModal={isOpen} modalTitle={title} onClose={toggle}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col>
              <ComponentCheckbox>
                <input type="checkbox" {...register("isGroup")} />
                <CommonText style={{ marginLeft: 5, marginTop: 0 }}>
                  Group Node
                </CommonText>
              </ComponentCheckbox>
              <CommonText color="grey" mt={5}>
                Further nodes can be only created under Group type nodes
              </CommonText>
              <InputField
                label="Department"
                name="name"
                register={register}
                required
                errors={errors}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} type="submit">
            Create New
          </CommonButton>
        </ModalFooter>
      </form>
    </ModalCommon>
  );
}

ModalNewDepartment.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  toggle: PropTypes.func,
  nodeParent: PropTypes.object,
  company: PropTypes.object,
  onChange: PropTypes.func,
};
