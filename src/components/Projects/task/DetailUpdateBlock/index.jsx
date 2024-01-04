import Attachments from "components/attachments";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { Card, Col, Row } from "reactstrap";
import {
  attachFiles,
  fetchTaskDetail,
  updateAssignees,
  updateTags,
} from "redux-toolkit/slices/Projects/task";
import styled from "styled-components";
import Assignments from "./assignments";
import Share from "./share";
import Tags from "./tags";

export const Button = styled.div`
  width: fit-content;
  padding: 0.6rem;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f2f2f2;
  }
`;

function DetailUpdateBlock({ taskId, assignees, attachments, tags = [] }) {
  const dispatch = useDispatch();

  const handleFilesChange = async files => {
    dispatch(
      attachFiles({
        taskId,
        attachments: files,
        refresh: fetchTaskDetail,
      })
    );
  };
  const handleTagsChange = tags => {
    dispatch(updateTags({ taskId, tags, refresh: fetchTaskDetail }));
  };
  const handleAssigneesChange = async assignees => {
    const assigneeIds = assignees.map(assignee => assignee.objectId);
    dispatch(
      updateAssignees({ taskId, assigneeIds, refresh: fetchTaskDetail })
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card body>
            <Row style={{ marginLeft: 0 }} className="d-flex align-items-start">
              <Col xs={2}>
                <Assignments
                  assignees={assignees}
                  onChange={handleAssigneesChange}
                />
              </Col>
              <Col xs={2}>
                <Share />
              </Col>
              <Col xl={2} lg={3}>
                <Tags initialTags={tags} onChange={handleTagsChange} />
              </Col>
              <Col xl={6} lg={5}>
                <Attachments
                  attachments={attachments}
                  onChange={handleFilesChange}
                  button={
                    <Button style={{ width: "fit-content" }}>
                      <div className="d-flex">
                        <i
                          className="bx bx-message-x"
                          style={{
                            fontSize: "20px",
                            marginRight: "10px",
                          }}
                        ></i>
                        <p style={{ marginBottom: 0 }}>Attachments</p>
                      </div>
                    </Button>
                  }
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

DetailUpdateBlock.propTypes = {
  taskId: PropTypes.string,
  assignees: PropTypes.array,
  attachments: PropTypes.array,
  tags: PropTypes.array,
};

export default DetailUpdateBlock;
