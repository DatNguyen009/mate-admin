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
import { deleteTasks, fetchTasks } from "redux-toolkit/slices/Projects/task";
import { useDispatch } from "react-redux";
import moment from "moment";
import TooltipCommon from "components/Common/TooltipCommon";
import { v4 as uuid_v4 } from "uuid";

const TaskCard = ({ item, index }) => {
  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const toggleModal = e => {
    e.stopPropagation();
    setOpenModal(prev => !prev);
  };

  const handleTaskClicked = () => {
    history.push(`/task/${item.name}`);
  };

  const handleDeleteClicked = () => {
    setOpenModal(false);
    dispatch(
      deleteTasks({
        itemObjectIds: [item.objectId],
        refresh: fetchTasks,
      })
    );
  };

  return (
    <React.Fragment>
      <Draggable key={item.objectId} draggableId={item.objectId} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleTaskClicked}
          >
            <div className="task-card">
              <Container>
                <Row>
                  <Col xs={8}>
                    <Row>
                      <CommonText level={3} style={{ margin: 0 }}>
                        {item.subject}
                      </CommonText>
                    </Row>
                    <CommonText style={{ display: "block", marginTop: 5 }}>
                      {moment(item.createdAt).format("DD MMM, YYYY")}
                    </CommonText>
                    {item.color && (
                      <div
                        className="color-box"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    )}
                  </Col>
                  <Col xs={4} className="text-end">
                    <BagdeStatus
                      titleBadge={item.priority}
                      typeBadge={item.priority}
                    />
                    <Spacer size={10} />
                  </Col>
                </Row>
                <Spacer size={30} />
                <Row>
                  <Col xs={10} className="d-flex">
                    {item?.assignees &&
                      item.assignees?.map((assignee, index) => {
                        const id = "tooltip" + uuid_v4();
                        return (
                          <React.Fragment key={`key-${index}`}>
                            <AvatarCommon
                              id={id}
                              style={{ margin: "-5px" }}
                              config={{
                                size: 34,
                                borderWidth: 2,
                                circle: true,
                              }}
                              src="https://picsum.photos/200/300"
                              className="circle-avatar-hover"
                              alt=""
                            />
                            <TooltipCommon
                              target={id}
                              content={assignee.username}
                            />
                          </React.Fragment>
                        );
                      })}
                  </Col>
                  <Col xs={2}>
                    <button
                      className="btn"
                      onClick={toggleModal}
                      style={{ color: "red" }}
                    >
                      <i className="dripicons-trash"></i>
                    </button>
                  </Col>
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
            Are you sure to delete this task?
          </CommonText>
          <Spacer size={20} />
        </ModalBody>
        <ModalFooter>
          <CommonButton level={0} onClick={toggleModal}>
            Cancel
          </CommonButton>
          <CommonButton level={2} onClick={handleDeleteClicked}>
            Delete
          </CommonButton>
        </ModalFooter>
      </ModalCommon>
    </React.Fragment>
  );
};

TaskCard.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};

export default TaskCard;
