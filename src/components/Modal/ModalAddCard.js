import React from "react";

import PropTypes from "prop-types";
import Spacing from "components/Common/Spacing";
import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import { CommonInput, CommonLabel } from "components/Common/inputCommon";

export default function ModalAddCard(props) {
  const { isOpen, toggle } = props;
  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle=" Create Chart"
        onClose={toggle}
      >
        <div className="modal-body">
          <div className="col-12">
            <CommonLabel>Chart name</CommonLabel>
            <CommonInput
              type="text"
              className="form-control"
              id="formrow-firstname-Input"
            />
          </div>
          <Spacing size={15}></Spacing>
          <div className="col-12">
            <CommonLabel>Select Dashboard</CommonLabel>
            <CommonInput
              type="text"
              className="form-control"
              id="formrow-firstname-Input"
            />
          </div>
        </div>
        <div className="modal-footer">
          <CommonButton type="button" level={0}>
            Save changes
          </CommonButton>
        </div>
      </ModalCommon>
    </React.Fragment>
  );
}

ModalAddCard.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};
