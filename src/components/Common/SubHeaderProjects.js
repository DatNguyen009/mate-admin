import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, Row } from "reactstrap";
import Spacing from "./Spacing";
import { CommonDropdownToggle } from "./inputCommon";
import { TITLE_STATUS } from "../../constants/dataHR";
import { TITLE_STATUS_PAYROLL } from "../../constants/dataPayroll";
import { TITLE_STATUS_CRM } from "constants/dataCRM";
import ViewableCommon from "./ViewableCommon";
import { CommonButton } from "./ButtonCommon";
import { useDispatch } from "react-redux";
import { openModal } from "redux-toolkit/slices/Modal/ModalSlice";
import { TITLE_STATUS_PROJECT } from "constants/dataProject";
import { TITLE_STATUS_USERS } from "constants/dataUsers";
import { BreadCrumbs } from "./Breadcrumbs";
import { TITLE_STATUS_STOCK } from "constants/dataStock";

export default function SubHeaderProject(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { listView, listMenu } = props;
  const pathName = location.pathname;
  const nameList = pathName.split("/");
  const [toggleListView, settoggleListView] = useState(false);
  const [toggleMenu, settoggleMenu] = useState(false);
  const title = nameList[nameList.length - 1];
  const mergeTitleStatus = [
    ...Object.values(TITLE_STATUS),
    ...Object.values(TITLE_STATUS_CRM),
    ...Object.values(TITLE_STATUS_PAYROLL),
    ...Object.values(TITLE_STATUS_PROJECT),
    ...Object.values(TITLE_STATUS_USERS),
    ...Object.values(TITLE_STATUS_STOCK),
  ];

  const toggleModal = () => {
    dispatch(openModal(title));
  };

  const redirectAddPage = title => {
    if (title === TITLE_STATUS.employee) {
      history.push(`employee/new-employee`);
      return;
    }

    if (title === TITLE_STATUS.employeeGrade) {
      history.push(`employee-grade/new-employee-grade`);
      return;
    }
  };

  const mapDropdown = dataDropdown => {
    return dataDropdown?.map(item => {
      return (
        <DropdownItem
          key={item.id}
          onClick={() => props.handleChangeView(item?.value)}
        >
          <div className="dropdown-item">
            {item.icon ? <i className={item.icon}></i> : ""}
            <span className="pr-1">{item.name}</span>
          </div>
        </DropdownItem>
      );
    });
  };

  return (
    <Row>
      <BreadCrumbs source={props.source} />
      <div className="subHeaderQueryReports d-flex justify-content-between align-items-center text-capitalize">
        <h4 className="mb-0 font-size-18 text-capitalize">
          {title.replaceAll("-", " ")}
        </h4>
        <ViewableCommon
          if={() => title.replaceAll("-", " ").includes("new ")}
          caseTrue={<CommonButton level={0}>Save</CommonButton>}
          caseFalse={
            <div className="d-flex justify-content-between align-items-center">
              <ViewableCommon
                if={() => title === "attendance"}
                caseTrue={
                  <CommonButton
                    light
                    onClick={() => dispatch(openModal("mark-attendance"))}
                  >
                    Mark Attendance
                  </CommonButton>
                }
              />
              {props.children}
              {!title.includes("tree") && props.showListView && (
                <Dropdown
                  isOpen={toggleListView}
                  toggle={() => settoggleListView(prev => !prev)}
                >
                  <CommonDropdownToggle
                    caret
                    className="d-flex align-items-center btn btn-outline-light"
                    tag="button"
                    type="button"
                  >
                    <i className="bx bx-list-ol"></i>
                    <span>List View</span>
                    <i className="mdi mdi-chevron-down"></i>
                  </CommonDropdownToggle>
                  <DropdownMenu>{mapDropdown(listView)}</DropdownMenu>
                </Dropdown>
              )}
              <Dropdown
                isOpen={toggleMenu}
                toggle={() => settoggleMenu(prev => !prev)}
              >
                <CommonDropdownToggle
                  caret
                  className="d-flex align-items-center btn btn-outline-light"
                  tag="button"
                  type="button"
                  style={{ padding: "11px" }}
                >
                  <i className="bx bx-dots-horizontal-rounded"></i>
                </CommonDropdownToggle>
                <DropdownMenu>{mapDropdown(listMenu)}</DropdownMenu>
              </Dropdown>
              <ViewableCommon
                if={() => !title.includes("tree")}
                caseTrue={
                  <CommonButton>
                    <i className="bx bx-reset"></i>
                  </CommonButton>
                }
              />
              <ViewableCommon
                if={() => mergeTitleStatus.includes(title)}
                caseTrue={
                  <ViewableCommon
                    if={() =>
                      title === TITLE_STATUS.employee ||
                      title === TITLE_STATUS.employeeGrade
                    }
                    caseTrue={
                      <CommonButton
                        level={0}
                        className="text-capitalize"
                        type="button"
                        onClick={() => redirectAddPage(title)}
                      >
                        {`+ Add ${title.replaceAll("-", " ")}`}
                      </CommonButton>
                    }
                    caseFalse={
                      <CommonButton
                        level={0}
                        className=" text-capitalize"
                        type="button"
                        data-toggle="modall"
                        data-target="#myModall"
                        onClick={toggleModal}
                      >
                        {`+ Add ${title.replaceAll("-", " ")}`}
                      </CommonButton>
                    }
                  />
                }
                caseFalse={
                  <Link to={`${title}/new-${title}`}>
                    <CommonButton level={0} className="text-capitalize">
                      {`+ Add ${title.replaceAll("-", " ")}`}
                    </CommonButton>
                  </Link>
                }
              />
            </div>
          }
        />
      </div>
      <Spacing size={10}></Spacing>
    </Row>
  );
}

SubHeaderProject.propTypes = {
  listView: PropTypes.array,
  listMenu: PropTypes.array,
  source: PropTypes.string,
  showListView: PropTypes.bool,
  handleChangeView: PropTypes.func,
  children: PropTypes.node,
};
