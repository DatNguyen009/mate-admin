import React from "react";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import InputField from "components/form-control/InputField";
export default function ContainerDepartmentGrade(props) {
  const {
    branch,
    department,
    employees,
    register,
    designation,
    employeeGrade,
  } = props;
  return (
    <React.Fragment>
      <Row>
        <Col>
          <InputField
            label="Department"
            name="department"
            register={register}
            list="departmentList"
            listData={department}
            titleSelect="department"
            autoComplete
          />
          <InputField
            label="Designation"
            name="designation"
            register={register}
            list="designationList"
            listData={designation}
            titleSelect="designation"
            autoComplete
          />
          <InputField
            label="Reports to"
            name="reportsTo"
            register={register}
            list="employeesList"
            listData={employees}
            titleSelect="employeeId"
            autoComplete
          />
        </Col>
        <Col>
          <InputField
            label="Grade"
            name="grade"
            register={register}
            list="employeeGradeList"
            listData={employeeGrade}
            titleSelect="name"
            autoComplete
          />
          <InputField
            label="Branch"
            name="branch"
            register={register}
            list="branchList"
            listData={branch}
            titleSelect="branch"
            autoComplete
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

ContainerDepartmentGrade.propTypes = {
  register: PropTypes.any,
  branch: PropTypes.array,
  department: PropTypes.array,
  employees: PropTypes.array,
  designation: PropTypes.array,
  employeeGrade: PropTypes.array,
};
