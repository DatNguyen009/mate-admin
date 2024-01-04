import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ModalBody, ModalFooter } from "reactstrap";

import { CommonButton } from "components/Common/ButtonCommon";
import { CommonText } from "components/Common/TextCommon";
import ModalCommon from "components/Common/ModalCommon";
import Spacer from "components/Common/Spacing";
import { setIsConfirm } from "redux-toolkit/slices/Modal/ModalSlice";

const ModalConfirm = props => {
  const { isOpen, toggle, title, onConfirm } = props;
  const dispatch = useDispatch();

  return (
    <ModalCommon modalTitle="Thông báo" isShowModal={isOpen} onClose={toggle}>
      <ModalBody>
        <Spacer size={20} />
        <CommonText
          style={{ fontSize: 16, fontWeight: "normal" }}
          level={0}
          mt={0}
        >
          {title}
        </CommonText>
        <Spacer size={20} />
      </ModalBody>
      <ModalFooter>
        <CommonButton level={1} onClick={toggle}>
          Huỷ
        </CommonButton>
        <CommonButton
          level={0}
          onClick={() => {
            dispatch(setIsConfirm(false));
            onConfirm();
          }}
        >
          Đồng ý
        </CommonButton>
      </ModalFooter>
    </ModalCommon>
  );
};

ModalConfirm.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
};

export default ModalConfirm;
