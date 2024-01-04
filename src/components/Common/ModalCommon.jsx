import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";

export default function ModalCommon(props) {
  const { children, isShowModal, modalTitle, onClose, size, ...rest } = props;
  return (
    <Modal size={size} isOpen={isShowModal} centered={true} {...rest}>
      <ModalHeader toggle={onClose} style={{ textTransform: "capitalize" }}>
        {modalTitle}
      </ModalHeader>
      {children}
    </Modal>
  );
}

ModalCommon.propTypes = {
  children: PropTypes.any,
  isShowModal: PropTypes.bool,
  modalTitle: PropTypes.string,
  onClose: PropTypes.func,
  size: PropTypes.string,
};
