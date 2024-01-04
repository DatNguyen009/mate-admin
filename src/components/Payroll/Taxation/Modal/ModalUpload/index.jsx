import React from "react";
import { CommonLabel } from "components/Common/inputCommon";
import ModalCommon from "components/Common/ModalCommon";
import { Col, ModalBody, ModalFooter, Row } from "reactstrap";
import PropTypes from "prop-types";
import device from "assets/images/device.svg";
import library from "assets/images/library.svg";
import link from "assets/images/link.svg";
import { CommonButton } from "components/Common/ButtonCommon";

export default function ModalUpload(props) {
  const { modalTitle, isShowModal, onClose } = props;
  return (
    <ModalCommon
      modalTitle={modalTitle}
      isShowModal={isShowModal}
      onClose={onClose}
    >
      <ModalBody>
        <Row>
          <Col className="d-flex">
            <div
              style={{
                border: "1px dashed #dce0e3",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                borderRadius: 10,
                minHeight: "16rem",
              }}
            >
              <CommonLabel className="form-label">
                Drag and drop files here or upload from
              </CommonLabel>
              <div>
                <Row>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={device} alt="device" width="30" height="30" />
                    <CommonLabel className="form-label">My Device</CommonLabel>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={library} alt="device" width="30" height="30" />
                    <CommonLabel className="form-label">My Device</CommonLabel>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={link} alt="device" width="30" height="30" />
                    <CommonLabel className="form-label">My Device</CommonLabel>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <CommonButton light>Set all private</CommonButton>
        <CommonButton level={0}>Upload</CommonButton>
      </ModalFooter>
    </ModalCommon>
  );
}

ModalUpload.propTypes = {
  modalTitle: PropTypes.string,
  isShowModal: PropTypes.bool,
  onClose: PropTypes.func,
};
