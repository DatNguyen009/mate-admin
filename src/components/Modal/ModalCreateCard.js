import React from "react";

import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import {
  CommonField,
  CommonInput,
  CommonLabel,
} from "components/Common/inputCommon";
import { CommonButton } from "components/Common/ButtonCommon";

export default function ModalCreateCard(props) {
  const { isOpen, toggle } = props;
  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle=" Create Chart"
        onClose={toggle}
      >
        <div className="modal-body">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <CommonLabel>Field</CommonLabel>
                <CommonField name="" as="select" className="form-control">
                  <option>Cost of Purchased Items</option>
                  <option>Cost of Issued Items</option>
                  <option>Cost of Delivered Items</option>
                  <option>Project Value</option>
                </CommonField>
              </div>
              <div className="col-6">
                <CommonLabel>Function</CommonLabel>
                <CommonField name="" as="select" className="form-control">
                  <option>Sum</option>
                  <option>Average</option>
                  <option>Minimum</option>
                  <option>Maximum</option>
                </CommonField>
              </div>
            </div>
            <hr />
            <div className="row">
              <p>Add to Dashboard</p>
              <div className="col-6">
                <CommonLabel>First name</CommonLabel>
                <CommonInput type="text" className="form-control" />
              </div>
              <div className="col-6">
                <CommonLabel>First name</CommonLabel>
                <CommonInput type="text" className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <CommonButton level={0} type="button">
            Save changes
          </CommonButton>
        </div>
      </ModalCommon>
    </React.Fragment>
  );
}

ModalCreateCard.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};
