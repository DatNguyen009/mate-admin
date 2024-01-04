import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { closeModal } from "redux-toolkit/slices/Modal/ModalSlice";
import { TITLE_STATUS } from "../../constants/dataHR";
import { TITLE_STATUS_PAYROLL } from "../../constants/dataPayroll";
import { TITLE_STATUS_CRM } from "constants/dataCRM";
import { TITLE_STATUS_USERS } from "constants/dataUsers";
import { TITLE_STATUS_PROJECT } from "constants/dataProject";
import ModalAddAppointment from "./ModalAddAppointment";
import ModalAddBranch from "./ModalAddBranch";
import ModalAddCampaign from "./ModalAddCampaign";
import ModalAddCommunication from "./ModalAddCommunication";
import ModalAddCustomer from "./ModalAddCustomer";
import ModalAddCustomerGroup from "./ModalAddCustomerGroup";
import ModalAddDesignation from "./ModalAddDesignation";
import ModalAddEmailCampaign from "./ModalAddEmailCampaign";
import ModalAddEmployeeGroup from "./ModalAddEmployeeGroup";
import ModalAddEmployeeHealthInsurance from "./ModalAddEmployeeHealthInsurance";
import ModalAddEmploymentType from "./ModalAddEmploymenType";
import ModalAddLeadSource from "./ModalAddLeadSource";
import ModalAddNewProject from "./ModalAddNewProject";
import ModalAddSalesPerson from "./ModalAddSalesPerson";
import ModalNewEmployeeSeparation from "./ModalNewEmployeeSeparation";
import ModalNewDepartment from "components/Hr/Employee/Modal/ModalNewDepartment/ModalNewDepartment";
import ModalAddShiftType from "components/Modal/ModalAddShiftType";
import ModalMarkAttendance from "components/Hr/Attendance/Modal/ModalMarkAttendance";
import ModalEmployeeOtherIncome from "./ModalEmployeeOtherIncome";
import ModalAddEmailGroup from "./ModalAddEmailGroup";
import ModalAddJobApplicantSource from "components/Hr/Recruitment/Modal/JobApplicantSource";
import ModalNewPayrollPeriod from "./ModalAddPayrollPeriod";
import ModalAddNewProjectType from "./ModalAddNewProjectType";
import ModalUpdateFile from "./ModalUploadFile";
import ModalAddUser from "./ModalAddUser";
import { TITLE_STATUS_STOCK } from "constants/dataStock";
import ModalAddItem from "./ModalAddItem";
import ModalAddNewTaskType from "./ModalAddNewTaskType";
import ModalConfirm from "./ModalConfirm";

const RootModal = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentTitle = useSelector(state => state.Modal.currentTitle);
  const pathName = location.pathname;
  const nameList = pathName.split("/");
  const title = nameList[nameList.length - 1].replaceAll("-", " ");

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleRenderModal = () => {
    switch (currentTitle) {
      case TITLE_STATUS_PROJECT.project: {
        return (
          <ModalAddNewProject
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_PROJECT.project}
          />
        );
      }
      case TITLE_STATUS.shiftType: {
        return (
          <ModalAddShiftType
            modalTitle={"New Shift Type"}
            onCloseModal={handleCloseModal}
            isShowModal={currentTitle === TITLE_STATUS.shiftType}
          />
        );
      }
      case TITLE_STATUS.employmentType: {
        return (
          <ModalAddEmploymentType
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS.employmentType}
          />
        );
      }
      case TITLE_STATUS.branch: {
        return (
          <ModalAddBranch
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS.branch}
          />
        );
      }
      case TITLE_STATUS.employeeGroup: {
        return (
          <ModalAddEmployeeGroup
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS.employeeGroup}
          />
        );
      }
      case TITLE_STATUS.employeeHealthInsurance: {
        return (
          <ModalAddEmployeeHealthInsurance
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS.employeeHealthInsurance}
          />
        );
      }
      case TITLE_STATUS.designation: {
        return (
          <ModalAddDesignation
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS.designation}
          />
        );
      }
      case TITLE_STATUS.departmentTree: {
        return (
          <ModalNewDepartment
            modalTitle={"New Department"}
            onCloseModal={handleCloseModal}
            isShowModal={currentTitle === TITLE_STATUS.departmentTree}
          />
        );
      }
      case TITLE_STATUS.employeeSeparation: {
        return (
          <ModalNewEmployeeSeparation
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS.employeeSeparation}
          />
        );
      }
      case TITLE_STATUS_PAYROLL.payrollPeriod: {
        return (
          <ModalNewPayrollPeriod
            modalTitle={"New Payroll Period"}
            onCloseModal={handleCloseModal}
            isShowModal={currentTitle === TITLE_STATUS_PAYROLL.payrollPeriod}
          />
        );
      }
      case TITLE_STATUS_PAYROLL.employeeOtherIncome: {
        return (
          <ModalEmployeeOtherIncome
            modalTitle={"New Employee Other Income"}
            onCloseModal={handleCloseModal}
            isShowModal={
              currentTitle === TITLE_STATUS_PAYROLL.employeeOtherIncome
            }
          />
        );
      }
      case TITLE_STATUS_CRM.communication: {
        return (
          <ModalAddCommunication
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_CRM.communication}
          />
        );
      }
      case TITLE_STATUS_CRM.leadSource: {
        return (
          <ModalAddLeadSource
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_CRM.leadSource}
          />
        );
      }
      case TITLE_STATUS_CRM.campaign: {
        return (
          <ModalAddCampaign
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_CRM.campaign}
          />
        );
      }
      case TITLE_STATUS_CRM.appointment: {
        return (
          <ModalAddAppointment
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_CRM.appointment}
          />
        );
      }
      case TITLE_STATUS_CRM.emailCampaign: {
        return (
          <ModalAddEmailCampaign
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_CRM.emailCampaign}
          />
        );
      }
      case TITLE_STATUS_CRM.customerGroup: {
        return (
          <ModalAddCustomerGroup
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_CRM.customerGroup}
          />
        );
      }
      case TITLE_STATUS_CRM.salesPerson: {
        return (
          <ModalAddSalesPerson
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_CRM.salesPerson}
          />
        );
      }
      case TITLE_STATUS_CRM.customer: {
        return (
          <ModalAddCustomer
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_CRM.customer}
          />
        );
      }
      case TITLE_STATUS_CRM.emailGroup: {
        return (
          <ModalAddEmailGroup
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_CRM.emailGroup}
          />
        );
      }
      case "mark-attendance": {
        return (
          <ModalMarkAttendance
            modalTitle={"Mark Attendance"}
            onCloseModal={handleCloseModal}
            isShowModal={currentTitle === "mark-attendance"}
          />
        );
      }
      case TITLE_STATUS.jobApplicantSource: {
        return (
          <ModalAddJobApplicantSource
            modalTitle={title}
            onCloseModal={handleCloseModal}
            isShowModal={currentTitle === TITLE_STATUS.jobApplicantSource}
          />
        );
      }
      case TITLE_STATUS_PROJECT.projectType: {
        return (
          <ModalAddNewProjectType
            isOpen={currentTitle === TITLE_STATUS_PROJECT.projectType}
            toggle={handleCloseModal}
            title={title}
          />
        );
      }
      case "upload-file": {
        return (
          <ModalUpdateFile
            toggle={handleCloseModal}
            isOpen={currentTitle === "upload-file"}
          />
        );
      }
      case TITLE_STATUS_USERS.user: {
        return (
          <ModalAddUser
            title={title}
            toggle={handleCloseModal}
            isOpen={currentTitle === TITLE_STATUS_USERS.user}
          />
        );
      }
      case TITLE_STATUS_STOCK.item: {
        return (
          <ModalAddItem
            modalTitle={"New Item"}
            onCloseModal={handleCloseModal}
            isShowModal={currentTitle === TITLE_STATUS_STOCK.item}
          />
        );
      }
      case "modal-confirm": {
        return (
          <ModalConfirm
            toggle={handleCloseModal}
            isOpen={currentTitle === "modal-confirm"}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  useEffect(() => {
    if (!currentTitle) return;
    dispatch(closeModal());
  }, [pathName]);

  return <>{handleRenderModal()}</>;
};

export default RootModal;
