import { CommonLabel } from "components/Common/inputCommon";
import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import InputField from "components/form-control/InputField";

export default function ContainerAttendanceAndLeaveDetail(props) {
  const { employmentType, register } = props;
  return (
    <React.Fragment>
      <Row>
        <Col>
          <InputField
            label="Attendance Device ID (Biometric/RF tag ID)"
            name="attendanceDeviceID"
            register={register}
          />
        </Col>
        <Col>
          <InputField
            label="Holiday List"
            name="holidayList"
            register={register}
          />
          <CommonLabel className="form-label mt-0" disabled>
            Applicable Holiday List
          </CommonLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField
            label="Default Shift"
            name="defaultShift"
            register={register}
            list="defaultShiftList"
            listData={employmentType}
            titleSelect="name"
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
ContainerAttendanceAndLeaveDetail.propTypes = {
  register: PropTypes.any,
  employmentType: PropTypes.array,
};
