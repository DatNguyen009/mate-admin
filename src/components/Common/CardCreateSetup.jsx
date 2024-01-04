import React from "react";
import { Card, CardText, CardTitle, Col, Row } from "reactstrap";
import Spacing from "./Spacing";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { CommonButton } from "./ButtonCommon";
import ModalAddDesignation from "components/Modal/ModalAddDesignation";
import { TITLE_CREATE_SETUP } from "constants/dataCreateSetup";

export default function CardCreateSetup(props) {
  const history = useHistory();
  const { dataCreate } = props;
  const [titleCreate, setTitleCreate] = useState(
    dataCreate[0].item[0].data.title
  );
  const [nameButton, setNameButton] = useState(
    dataCreate[0].item[0].data.nameBtn
  );
  const [description, setDescription] = useState("");
  const [toggleAddModal, setToggleAddModal] = useState([
    { isShowModal: false, name: "Department" },
    { isShowModal: false, name: "Designation" },
  ]);

  const handleClickId = id => {
    const dataSelect = dataCreate[0].item.find(item => item.id === id);
    const title = dataSelect.data.title;
    const nameBtn = dataSelect.data.nameBtn;
    setTitleCreate(title);
    setNameButton(nameBtn);
  };
  const toggleModal = value => {
    const EmployeeLength = localStorage.getItem("EmployeeLength");
    if (value === TITLE_CREATE_SETUP.designation) {
      setToggleAddModal(prev => [
        prev[0],
        { isShowModal: !prev[1].isShowModal, name: prev[1].name },
      ]);
      return;
    }

    if (value === TITLE_CREATE_SETUP.holiday) {
      history.push("/holiday-list/new-holiday-list");
      return;
    }

    if (value === TITLE_CREATE_SETUP.employee) {
      history.push(`/employee/new-employee-${EmployeeLength}`, {
        inforE: [],
        isDetail: false,
      });
      return;
    }

    if (value === TITLE_CREATE_SETUP.LeaveType) {
      history.push("/leave-type/new-leave-type");
      return;
    }

    if (value === TITLE_CREATE_SETUP.LeaveAllocation) {
      history.push("/leave-allocation/new-leave-allocation");
      return;
    }
  };

  return (
    <React.Fragment>
      <Row>
        {dataCreate.map((item, index) => {
          const dataItem = item.item;
          return (
            <Col md={12} key={index}>
              <Card body>
                <CardTitle className="d-flex mt-0 justify-content-between">
                  <p style={{ marginBottom: 0 }}>{item.title}</p>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      padding: 0,
                      marginBottom: 0,
                      cursor: "pointer",
                    }}
                  >
                    Dismiss
                  </p>
                </CardTitle>
                <CardText style={{ padding: 0 }}>{item.description}</CardText>
                <Spacing />
                <div className="flex-space-bettwen">
                  <ul className="list_item">
                    {dataItem.map((item, index) => (
                      <li
                        className="list_item_create_setup card_hover"
                        key={index}
                        onClick={() => handleClickId(item.id)}
                      >
                        <div className="number_id">{item.id}</div>
                        {item.name}
                      </li>
                    ))}
                  </ul>
                  <div className="flex-right">
                    <CardTitle className="h4 mt-0" style={{ fontSize: "20px" }}>
                      {titleCreate}
                    </CardTitle>
                    <CardText>{description}</CardText>
                    <Link to="#">
                      <CommonButton
                        level={0}
                        onClick={() => toggleModal(titleCreate)}
                      >
                        {" "}
                        {nameButton}
                      </CommonButton>
                    </Link>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
      <ModalAddDesignation
        isOpen={toggleAddModal[1].isShowModal}
        toggle={() => toggleModal("Create Designation")}
        title="Designation"
      />
    </React.Fragment>
  );
}

CardCreateSetup.propTypes = {
  dataCreate: PropTypes.array,
};
