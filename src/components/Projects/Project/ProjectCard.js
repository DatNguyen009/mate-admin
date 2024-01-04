import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, ModalBody, ModalFooter, Row } from "reactstrap";
import AvatarCommon from "components/Common/AvatarCommon";
import { CommonText } from "components/Common/TextCommon";
import BagdeStatus from "components/Common/BagdeStatus";
import { Link } from "react-router-dom";
import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import Spacer from "components/Common/Spacing";
import { useDispatch } from "react-redux";
import {
  deleteProject,
  fetchProject,
} from "redux-toolkit/slices/Projects/project";

function ProjectCard({ projects }) {
  const [openModal, setOpenModal] = useState(false);
  const [itemDetele, setitemDetele] = useState({});
  const dispatch = useDispatch();
  const toggleModal = project => {
    setOpenModal(prev => !prev);
    setitemDetele(project);
  };

  const handleDeleteClicked = async () => {
    toggleModal();
    dispatch(
      deleteProject({
        itemObjectIds: [itemDetele.objectId],
        refresh: fetchProject,
      })
    );
  };
  return (
    <React.Fragment>
      {projects?.map((project, index) => (
        <Col xl="4" sm="6" key={`key-${project.objectId}`}>
          <Card>
            <CardBody>
              <Row>
                <Col sm="3">
                  <AvatarCommon
                    config={{ size: 70, borderWidth: 6, circle: true }}
                    src="https://picsum.photos/200/300"
                  />
                </Col>
                <Col sm="9" className="pl-2">
                  <Row>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={`project/${project.name}`}>
                        <CommonText level={1} color="black" mt={0}>
                          {project.name}
                        </CommonText>
                      </Link>
                      <Link to={`project/${project.name}/task`}>
                        <CommonButton>View Task</CommonButton>
                      </Link>
                    </div>
                  </Row>
                  <Row>
                    <CommonText level={0} mt={5}>
                      {project.projectName || `Description ${index + 1}`}
                    </CommonText>
                  </Row>
                  <Spacer size={20} />
                  <Row className="ps-3" style={{ minHeight: 40 }}>
                    {project.members ? (
                      project.members?.map((user, index) => (
                        <AvatarCommon
                          key={`key-${index}`}
                          style={{ margin: "-5px" }}
                          config={{ size: 40, borderWidth: 2, circle: true }}
                          src="https://picsum.photos/200/300"
                          className="circle-avatar-hover"
                          alt=""
                        />
                      ))
                    ) : (
                      <Spacer size={30} />
                    )}
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <hr style={{ margin: 0 }} />
            <CardBody>
              <Row>
                <Col sm="4" className="d-flex align-items-center">
                  <BagdeStatus
                    titleBadge={project.status}
                    typeBadge={
                      project.status === "open"
                        ? "success"
                        : project.status === "completed"
                        ? "warning"
                        : project.status === "cancelled"
                        ? "danger"
                        : "success"
                    }
                  />
                </Col>
                <Col sm="6" className="d-flex align-items-center gap-1">
                  <i className="bx bx-calendar" />
                  <CommonText mt="0">{project.expectedStartDate}</CommonText>
                </Col>
                <Col sm="2">
                  <button
                    className="btn"
                    onClick={() => toggleModal(project)}
                    style={{ color: "red" }}
                  >
                    <i className="dripicons-trash"></i>
                  </button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      ))}
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
            Are you sure to delete {itemDetele?.name}?
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
}

ProjectCard.propTypes = {
  projects: PropTypes.array,
};
export default ProjectCard;
