import React from "react";
import { Button, Card } from "reactstrap";
import PropTypes from "prop-types";

import ModalUploadFile from "components/Modal/ModalUploadFile";

const HeaderMenu = props => {
  const { avatar, isOpen, onUploaded, toggleUploadModal } = props;

  return (
    <>
      <Card body>
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ gap: 50 }}
        >
          <div
            onClick={toggleUploadModal}
            style={
              avatar
                ? { background: `url(${avatar}) no-repeat center` }
                : { background: "#f0f3f6" }
            }
            className="user-avatar"
          >
            {!avatar && "NV"}
          </div>
          <div className="Sidebar-assign-item d-flex flex-column flex-fill">
            <div className="d-flex">
              <i
                className="bx bx-user-plus"
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                }}
              ></i>
              <p style={{ marginBottom: "0.6rem" }}>Assigned To</p>
            </div>
            <Button
              color="light"
              className="position-relative p-0 avatar-xs rounded-circle"
              type="button"
            >
              <span className="avatar-title bg-transparent text-reset">
                <i className="bx bx-plus"></i>
              </span>
            </Button>
          </div>
          <div className="Sidebar-assign-item d-flex flex-column flex-fill">
            <div className="d-flex">
              <i
                className="bx bx-message-x"
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                }}
              ></i>
              <p style={{ marginBottom: "0.6rem" }}>Attachments</p>
            </div>
            <Button color="light" type="button" style={{ width: 140 }}>
              Attach File
              <i className="bx bx-plus" style={{ paddingLeft: "2rem" }}></i>
            </Button>
          </div>
          <div className="Sidebar-assign-item d-flex flex-column flex-fill">
            <div className="d-flex">
              <i
                className="bx bx-star"
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                }}
              ></i>
              <p style={{ marginBottom: "0.6rem" }}>Review</p>
            </div>
            <Button
              color="light"
              className="position-relative p-0 avatar-xs rounded-circle"
              type="button"
            >
              <span className="avatar-title bg-transparent text-reset">
                <i className="bx bx-plus"></i>
              </span>
            </Button>
          </div>
          <div className="Sidebar-assign-item d-flex flex-column flex-fill">
            <div className="d-flex">
              <i
                className="bx bx-user"
                style={{
                  fontSize: "20px",
                  marginRight: "10px",
                }}
              ></i>
              <p style={{ marginBottom: "0.6rem" }}>Share With</p>
            </div>
            <Button
              color="light"
              className="position-relative p-0 avatar-xs rounded-circle"
              type="button"
            >
              <span className="avatar-title bg-transparent text-reset">
                <i className="bx bx-plus"></i>
              </span>
            </Button>
          </div>
        </div>
      </Card>
      <ModalUploadFile
        isOpen={isOpen}
        toggle={toggleUploadModal}
        onUploaded={onUploaded}
      />
    </>
  );
};

HeaderMenu.propTypes = {
  avatar: PropTypes.string,
  onUploaded: PropTypes.func,
  isOpen: PropTypes.bool,
  toggleUploadModal: PropTypes.func,
};

export default HeaderMenu;
