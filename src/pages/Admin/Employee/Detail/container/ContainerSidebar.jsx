import React from "react";
import { Button, Card, CardText, Col, Row } from "reactstrap";
import PropTypes from "prop-types";

export default function ContainerSidebar(props) {
  const { inforEmployee } = props;
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card body>
            <div className="Sidebar d-flex">
              <div className="Sidebar-image badge bg-light ">
                <p style={{ margin: "4rem" }}>NV</p>
              </div>
              <div className="Sidebar-detail align-items-center d-grid">
                <div
                  style={{
                    marginLeft: "4.5rem",
                    marginBottom: "1rem",
                    fontSize: "1rem",
                  }}
                >
                  <b>
                    {`${inforEmployee.lastName} ${inforEmployee.middleName} ${inforEmployee.firstName}`}
                  </b>
                </div>
                <div className="d-flex ">
                  <div>
                    <div className="Sidebar-assign-item d-flex">
                      <i
                        className="bx bx-user-plus"
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      ></i>
                      <p style={{ marginBottom: "0.6rem" }}>Assigned To</p>
                    </div>
                    <div>
                      <Button
                        color="light"
                        className="position-relative p-0 avatar-xs rounded-circle"
                      >
                        <span className="avatar-title bg-transparent text-reset">
                          <i className="bx bx-plus"></i>
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="Sidebar-attach-item d-flex">
                      <i
                        className="bx bx-message-x"
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      ></i>
                      <p style={{ marginBottom: "0.6rem" }}>Attachments</p>
                    </div>
                    <div>
                      <Button color="light" className="">
                        Attach File
                        <i
                          className="bx bx-plus"
                          style={{ paddingLeft: "2rem" }}
                        ></i>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="Sidebar-review-item d-flex">
                      <i
                        className="bx bx-star"
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      ></i>
                      <p style={{ marginBottom: "0.6rem" }}>Review</p>
                    </div>
                    <div>
                      <Button
                        color="light"
                        className="position-relative p-0 avatar-xs rounded-circle"
                      >
                        <span className="avatar-title bg-transparent text-reset">
                          <i className="bx bx-plus"></i>
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="Sidebar-share-item d-flex">
                      <i
                        className="bx bx-user"
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      ></i>
                      <p style={{ marginBottom: "0.6rem" }}>Share With</p>
                    </div>
                    <div>
                      <Button
                        color="light"
                        className="position-relative p-0 avatar-xs rounded-circle"
                      >
                        <span className="avatar-title bg-transparent text-reset">
                          <i className="bx bx-plus"></i>
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="Sidebar-tag-item d-flex">
                      <i
                        className="bx bx-purchase-tag"
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      ></i>
                      <p style={{ marginBottom: "0.6rem" }}>Tag</p>
                    </div>
                    <div>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

ContainerSidebar.propTypes = {
  inforEmployee: PropTypes.object,
};
