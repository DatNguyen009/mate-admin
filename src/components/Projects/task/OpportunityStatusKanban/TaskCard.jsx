import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Col, Container, ModalBody, ModalFooter, Row } from "reactstrap";
import AvatarCommon from "components/Common/AvatarCommon";
import Spacer from "components/Common/Spacing";
import { CommonText } from "components/Common/TextCommon";
import BagdeStatus from "components/Common/BagdeStatus";
import ModalCommon from "components/Common/ModalCommon";
import { CommonButton } from "components/Common/ButtonCommon";
import {
  deleteOpportunity,
  fetchOpportunities,
} from "redux-toolkit/slices/CRM/OpportunitySlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import TooltipCommon from "components/Common/TooltipCommon";
import { v4 as uuid_v4 } from "uuid";
import { toastrErrorAlert } from "components/Common/AlertToastr";

const TaskCard = ({ item, index, deleteTask, openDetailTask }) => {
  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const toggleModal = e => {
    e.stopPropagation();
    setOpenModal(prev => !prev);
  };

  const handleTaskClicked = e => {
    e.stopPropagation();
    openDetailTask({ objectId: item?.objectId });
  };

  const handleDeleteClicked = () => {
    setOpenModal(false);
    deleteTask({ objectId: item?.objectId });
    // dispatch(deleteOpportunity(item.objectId))
    //   .then(() => {
    //     dispatch(
    //       fetchOpportunities(
    //         "?include=client&include=productCategory&skip=0&order=-createdAt"
    //       )
    //     );
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     toastrErrorAlert("Đã có lỗi xảy ra . Vui lòng thử lại sau !");
    //   });
  };

  return (
    <React.Fragment>
      <Draggable key={item.objectId} draggableId={item.objectId} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onDoubleClick={handleTaskClicked}
          >
            <div className="task-card">
              <Container>
                <Row className="d-flex align-items-center">
                  <Col xs={9}>
                    <div
                      className="card-title"
                      dangerouslySetInnerHTML={{ __html: item?.innerHtmlTitle }}
                    >
                      {/* <CommonText style={{ display: "block", marginTop: 5 }}>
                        {item?.clientName}
                      </CommonText> */}
                    </div>
                  </Col>
                  <Col xs={3}>
                    <button
                      className="btn"
                      onClick={toggleModal}
                      style={{ color: "red" }}
                    >
                      <i className="dripicons-trash"></i>
                    </button>
                  </Col>
                </Row>
                <Row>
                  <div
                    className="card-content"
                    dangerouslySetInnerHTML={{ __html: item?.innerHtmlContent }}
                  ></div>
                  {/* <CommonText
                    style={{ display: "block", fontWeight: 300, marginTop: 5 }}
                  >
                    {item?.oppName}
                  </CommonText>
                  <Spacer size={10} />
                  <CommonText
                    style={{ display: "block", fontWeight: 300, marginTop: 5 }}
                  >
                    {item?.typeCategory}
                  </CommonText>
                  <Spacer size={10} />
                  <CommonText
                    style={{ display: "block", fontWeight: 300, marginTop: 5 }}
                  >
                    {item?.oppType}
                  </CommonText> */}
                </Row>
              </Container>
            </div>
          </div>
        )}
      </Draggable>

      <ModalCommon
        modalTitle="Delete"
        isShowModal={openModal}
        onClose={toggleModal}
      >
        <ModalBody>
          <Spacer size={20} />
          <CommonText
            style={{ fontSize: 16, fontWeight: "normal" }}
            level={0}
            mt={0}
          >
            Bạn chắc chắn xóa mục này ?
          </CommonText>
          <Spacer size={20} />
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} onClick={toggleModal}>
            Hủy
          </CommonButton>
          <CommonButton level={2} onClick={handleDeleteClicked}>
            Xác nhận
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </React.Fragment>
  );
};

TaskCard.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
  deleteTask: PropTypes.func.isRequired,
  openDetailTask: PropTypes.func.isRequired,
};

export default TaskCard;
