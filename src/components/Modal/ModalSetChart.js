import React from "react";

import PropTypes from "prop-types";
import ModalCommon from "components/Common/ModalCommon";
import { CommonField, CommonLabel } from "components/Common/inputCommon";
import { CommonButton } from "components/Common/ButtonCommon";

export default function ModalSetChart(props) {
  const { isOpen, toggle } = props;
  return (
    <React.Fragment>
      <ModalCommon
        isShowModal={isOpen}
        modalTitle="Create Chart"
        onClose={toggle}
      >
        <div className="modal-body">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <CommonLabel>X Field</CommonLabel>

                <CommonField name="" as="select" className="form-control">
                  <option>Task</option>
                  <option>Subject</option>
                  <option>Status</option>
                  <option>Priority</option>
                  <option>Expected Start Date</option>
                  <option>Expected End Date</option>
                  <option>Actual End Date</option>
                </CommonField>
              </div>
              <div className="col-6">
                <CommonLabel>Type of chart</CommonLabel>
                <CommonField name="" as="select" className="form-control">
                  <option>Bar</option>
                  <option>Line</option>
                  <option>Percentage</option>
                  <option>Pie</option>
                  <option>Donut</option>
                </CommonField>
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

ModalSetChart.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};
