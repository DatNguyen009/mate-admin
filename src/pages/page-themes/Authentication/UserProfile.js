import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { CommonButton } from "components/Common/ButtonCommon";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonInputt, CommonLabel } from "components/Common/inputCommon";
import ModalCommon from "components/Common/ModalCommon";
import Spacer from "components/Common/Spacing";
import { language_vn } from "helpers/language_vn";
import { GET_USERS1 } from "helpers/url_helper";
import React, { useState } from "react";
import { Container, ModalBody, ModalFooter, Row } from "reactstrap";
import httpService from "services/httpService";

export default function UserProfile() {
  const [toggle, setToggle] = useState(false);
  const [pass, setPass] = useState({
    pass: "",
    retypePass: "",
  });

  const onResetPassword = async () => {
    const user = JSON.parse(localStorage.getItem("User"));
    try {
      if (!pass.pass || !pass.retypePass) {
        toastrErrorAlert(
          !pass.pass ? "Vui lòng nhập mật khẩu" : "Vui lòng nhập lại mật khẩu"
        );
        return;
      }

      if (pass.pass !== pass.retypePass) {
        toastrErrorAlert("Mật khẩu mới và nhập lại mật khẩu phải giống nhau!");
        return;
      }
      const res = await httpService.put(GET_USERS1 + `/${user?.objectId}`, {
        objectId: user?.objectId,
        password: pass.pass,
      });

      setToggle(false);
      if (res?.updatedAt) {
        toastrSuccessAlert("Đổi mật khẩu thành công!!");
        return;
      }
    } catch (error) {
      toastrErrorAlert(language_vn.error);
    }
  };
  return (
    <div className="page-content">
      <Container fluid>
        {/* Render Breadcrumb */}
        <HeaderCreateItem title={`Thông tin cá nhân`}>
          <div className="d-flex align-items-center mb-2">
            <div className="flex-grow-1"></div>
            <Spacer size={12} />
            <CommonButton
              level={3}
              onClick={() => {
                setToggle(true);
              }}
            >
              Đổi mật khẩu
            </CommonButton>
          </div>
        </HeaderCreateItem>
        <Row></Row>
      </Container>
      <ModalCommon
        modalTitle="Đổi mật khẩu"
        isShowModal={toggle}
        onClose={() => {
          setToggle(prev => !prev);
        }}
      >
        <ModalBody>
          <div style={{ margin: "0 12px" }}>
            <CommonLabel>Nhập mật khẩu mới</CommonLabel>
            <CommonInputt
              className="form-control"
              type="password"
              onChange={e => {
                setPass({
                  ...pass,
                  pass: e.target.value,
                });
              }}
            />
            <CommonLabel>Nhập lại mật khẩu mới</CommonLabel>
            <CommonInputt
              className="form-control"
              type="password"
              onChange={e => {
                setPass({
                  ...pass,
                  retypePass: e.target.value,
                });
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <CommonButton
            level={0}
            onClick={() => {
              setToggle(prev => !prev);
            }}
          >
            Huỷ
          </CommonButton>
          <CommonButton level={3} onClick={onResetPassword}>
            Đồng ý
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </div>
  );
}
