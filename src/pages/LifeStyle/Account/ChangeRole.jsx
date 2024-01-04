import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import Spacer from "components/Common/Spacing";
import React, { useState } from "react";
import { Col, ModalBody, ModalFooter, Row } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import SelectConst from "components/form-control/SelectConst";
import { roles } from "helpers/lifestyle_helper";
import VVSSelect from "components/form-control/VVSSelect";
import PropTypes from "prop-types";
import { GET_USER_INFO } from "helpers/url_helper";
import { message } from "antd";
import httpService from "services/httpService";

const ROLES = [
  {
    text: "Admin",
    value: roles.SUPERVISOR,
    highLevel: [roles.SUPERVISOR],
  },
  {
    text: "Tổng giám đốc",
    value: `${roles.DIRECTOR}-2`,
    highLevel: [roles.SUPERVISOR, roles.DIRECTOR],
  },
  {
    text: "Giám đốc",
    value: `${roles.DIRECTOR}-1`,
    highLevel: [roles.SUPERVISOR, roles.DIRECTOR],
  },
  {
    text: "Tổng quản lý",
    value: `${roles.MANAGER}-2`,
    highLevel: [roles.SUPERVISOR, roles.DIRECTOR, roles.MANAGER],
  },
  {
    text: "Quản lý",
    value: `${roles.MANAGER}-1`,
    userType: 1,
    highLevel: [roles.SUPERVISOR, roles.DIRECTOR, roles.MANAGER],
  },
  {
    text: "Đại lý",
    value: roles.EXPERT,
    highLevel: [roles.SUPERVISOR, roles.DIRECTOR, roles.MANAGER],
  },
  {
    text: "Người dùng",
    value: roles.USER,
    highLevel: [
      roles.SUPERVISOR,
      roles.DIRECTOR,
      roles.MANAGER,
      roles.EXPERT,
      roles.USER,
    ],
  },
];

const ButtonWithChangeRole = ({ userId, refetchUserInfo, defaultRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const schema = yup
    .object({
      role: yup.string().required("This field is required!"),
      presenter: yup.string().required("This field is required!"),
    })
    .required();
  const [roleSelected, setRoleSelected] = useState({});
  const [presenterSelected, setPresenterSelected] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleToggleModal = () => {
    setIsOpen(prev => !prev);
  };
  const onSubmit = async value => {
    if (!userId) {
      return;
    }
    const splitRole = value?.role?.split("-");
    try {
      await httpService.put(GET_USER_INFO + `/${userId}`, {
        role: splitRole[0],
        ...(splitRole?.length === 2 && {
          userType: Number(splitRole[1]),
        }),
        ...(presenterSelected && { presenter: presenterSelected }),
      });

      message.success("Thay đổi chức vụ thành công!!");
      refetchUserInfo && refetchUserInfo();
      handleToggleModal();
    } catch (error) {
      message.error("Thay đổi chức vụ không thành công. Vui lòng thử lại sau!");
    }
  };

  const handleRoleSelected = e => {
    const roleFind = ROLES.find(item => {
      return item.value === e.target.value;
    });

    setRoleSelected(roleFind);
    rest.setValue("presenter", "");
  };

  const handlePresenterSelected = item => {
    setPresenterSelected(item?.email);
  };

  return (
    <>
      <CommonButton level={1} type="button" onClick={handleToggleModal}>
        Đổi chức vụ
      </CommonButton>
      {isOpen && (
        <form>
          <ModalCommon
            modalTitle="Đổi chức vụ"
            isShowModal={isOpen}
            onClose={handleToggleModal}
            size={"lg"}
          >
            <ModalBody className="px-3">
              <Spacer size={20} />
              <Row>
                <Col sm={6}>
                  <SelectConst
                    name="role"
                    options={ROLES.slice(
                      0,
                      ROLES.findIndex(item => item.text === defaultRole)
                    )}
                    label="Chọn chức vụ"
                    errors={errors}
                    required
                    {...rest}
                    onChange={handleRoleSelected}
                    className="mt-3"
                  />
                </Col>

                <Col sm={6}>
                  <VVSSelect
                    label="Chọn cấp trên"
                    name="presenter"
                    required
                    errors={errors}
                    model="UserInfo"
                    searchField="fullName"
                    fieldView={["fullName", "email", "phoneNumber", "role"]}
                    conditionField={{
                      ...(roleSelected && {
                        role: {
                          $in: roleSelected?.highLevel,
                        },
                      }),
                      ...(roleSelected &&
                      roleSelected?.value?.split("-")?.length === 2 &&
                      Number(roleSelected?.value?.split("-")[1]) === 2
                        ? {
                            userType: Number(
                              roleSelected?.value?.split("-")[1]
                            ),
                          }
                        : {
                            userType: { $in: [1, 2] },
                          }),
                    }}
                    disabled={roleSelected?.text ? false : true}
                    onSelect={handlePresenterSelected}
                    {...rest}
                  />
                </Col>
              </Row>
              <Spacer size={20} />
            </ModalBody>
            <ModalFooter>
              <CommonButton level={1} type="button" onClick={handleToggleModal}>
                Cancel
              </CommonButton>
              <CommonButton
                level={0}
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </CommonButton>
            </ModalFooter>
          </ModalCommon>
        </form>
      )}
    </>
  );
};

export default ButtonWithChangeRole;

ButtonWithChangeRole.propTypes = {
  userId: PropTypes.string,
  refetchUserInfo: PropTypes.func,
  defaultRole: PropTypes.string,
};
