import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import httpService from "services/httpService";
import { GET_NOTIFICATIONS } from "helpers/url_helper";

//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";

//i18n
import { withTranslation } from "react-i18next";
import { countTimeSince } from "helpers/erp_helper";

function NotificationDropdown(props) {
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [noLoadMore, setNoLoadMore] = useState(0);

  const toggle = () => {
    if (!menu) {
      getNewNotification();
    }
    setMenu(prev => !prev);
  };

  const getNewNotification = async () => {
    const localStoredEmployee = JSON.parse(localStorage.getItem("Employee"));
    const optional = {
      params: {
        where: {
          isActive: true,
          employees: {
            $in: [
              {
                __type: "Pointer",
                className: "Employee",
                objectId: localStoredEmployee.objectId,
              },
            ],
          },
        },
        order: "-createdAt",
        limit: 5,
        skip: noLoadMore,
      },
    };

    const { results: newNotifications } = await httpService.get(
      GET_NOTIFICATIONS,
      optional
    );

    setNotifications(
      noLoadMore === 0
        ? newNotifications
        : [...notifications, ...newNotifications]
    );
  };

  useEffect(async () => {
    if (menu) {
      getNewNotification();
    }
  }, [noLoadMore]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={toggle}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell" />
          {/* {notifications?.length > 0 && (
            <span className="badge bg-danger rounded-pill">
              {notifications?.length}
            </span>
          )} */}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {"Thông báo"} </h6>
              </Col>
              <div className="col-auto">
                {/* <a href="#" className="small">
                  {" "}
                  Xem tất cả
                </a> */}
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "300px" }}>
            {notifications?.length > 0 &&
              notifications.map((noti, index) => (
                <Link
                  key={index}
                  to=""
                  className="text-reset notification-item"
                >
                  <div className="d-flex">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-primary rounded-circle font-size-16">
                        <i className="bx bx-message-rounded-x" />
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mt-0 mb-1">
                        {noti?.shortTitle || noti?.title || "---"}
                      </h6>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">{noti?.content}</p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline" />{" "}
                          {countTimeSince(noti?.createdAt)}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            {/* <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <i className="bx bx-cart" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">{"Your order is placed"}</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {"If several languages coalesce the grammar"}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" /> {"3 min ago"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <img
                  src={avatar3}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">James Lemire</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {"It will seem like simplified English" + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {"1 hours ago"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-success rounded-circle font-size-16">
                    <i className="bx bx-badge-check" />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">{"Your item is shipped"}</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {"If several languages coalesce the grammar"}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" /> {"3 min ago"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="" className="text-reset notification-item">
              <div className="d-flex">
                <img
                  src={avatar4}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">Salena Layfield</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {"As a skeptical Cambridge friend of mine occidental" +
                        "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {"1 hours ago"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link> */}
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>{" "}
              <span
                onClick={() => setNoLoadMore(prev => prev + 5)}
                key="t-view-more"
              >
                {"Xem thêm..."}
              </span>
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}

NotificationDropdown.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(NotificationDropdown);
