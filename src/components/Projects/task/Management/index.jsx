import React, { useEffect, useState, useMemo } from "react";
import httpService from "services/httpService";
import { Row, Col } from "reactstrap";
import { Select } from "antd";
import {
  fetchTasks,
  postBatchAction,
  updateTaskStatus,
  updateTaskDetail,
  deleteTask,
  createTask,
} from "redux-toolkit/slices/Projects/task";
import { useDispatch, useSelector } from "react-redux";
import Spacer from "components/Common/Spacing";
import Kanban from "../OpportunityStatusKanban/Kanban";
import { GET_TASK, GET_SYSCFG } from "helpers/url_helper";
import { getFileType } from "helpers/erp_helper";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { useHistory } from "react-router-dom";
import AddNewTask from "./AddNewTask";
import moment from "moment";

export default function TaskManagementKanban() {
  const [taskList, setTaskList] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [projectsFilter, setProjectsFilter] = useState([]);
  // const [assigneesFilter, setAssigneesFilter] = useState([]);
  const [projectSelectedFilter, setProjectSelectedFilter] = useState("");
  const [assigneesSelectedFilter, setAssigneesSelectedFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [sysconfigStageTask, setSysconfigStageTask] = useState(null);
  const [taskCreateFilter, setTaskCreateFilter] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = useSelector(state => state.Task.tasks);

  const toggleModal = e => {
    e.stopPropagation();
    setOpenModal(prev => !prev);
    setTaskId("");
  };

  const getProjectsFilter = async () => {
    const { results: projects } = await httpService.get(
      "/parse/classes/Project?include=members"
      //'/parse/classes/Project?include=members&where={"isActive":true}'
    );

    if (!projects || projects.length === 0) return;

    const projectsFilter = projects?.map((p, index) => {
      return {
        index,
        label: p.name,
        value: p.objectId,
        members: p.members,
      };
    });

    setProjectsFilter(projectsFilter || []);
    setProjectSelectedFilter(projectsFilter[0]?.value);
  };

  useEffect(() => {
    getProjectsFilter();
    getStageTask();
  }, []);

  const assigneesFilter = useMemo(() => {
    const assigneesOption = [{ label: "", value: "" }];

    const assignees = projectsFilter
      .find(p => p.value === projectSelectedFilter)
      ?.members.map(m => {
        return {
          label: `${m.fullName} (${m.employeeId})`,
          value: m.objectId,
        };
      });

    assigneesSelectedFilter && setAssigneesSelectedFilter(""); //reset
    return [...assigneesOption, ...(assignees || [])];
  }, [projectSelectedFilter]);

  const configFilter = useMemo(() => {
    const optional = {
      params: {
        include: "assignees",
        where: {
          isArchive: false,
          ...(projectSelectedFilter && {
            project: {
              __type: "Pointer",
              className: "Project",
              objectId: projectSelectedFilter,
            },
          }),
          ...(assigneesSelectedFilter && {
            assignees: {
              $in: [
                {
                  __type: "Pointer",
                  className: "Employee",
                  objectId: assigneesSelectedFilter,
                },
              ],
            },
          }),
        },
      },
    };

    return optional;
  }, [projectSelectedFilter, assigneesSelectedFilter]);

  useEffect(() => {
    if (projectSelectedFilter) {
      getTask();
    }
  }, [projectSelectedFilter, assigneesSelectedFilter]);

  const handleOnchangeProjects = value => {
    setProjectSelectedFilter(value);
  };

  const handleOnchangeAssignees = value => {
    setAssigneesSelectedFilter(value);
  };

  const getTask = async () => {
    dispatch(fetchTasks(configFilter));
  };

  const getStageTask = async () => {
    const { results: stageTask } = await httpService.get(
      '/parse/classes/SysCfg?where={"Category":"stageTask"}'
    );
    setSysconfigStageTask(stageTask[0]);
    const customStage = stageTask[0]?.Values?.map(stage => {
      return {
        id: +stage.id,
        text: stage.text,
        value: stage.value,
      };
    }).sort((a, b) => a.id - b.id);
    setTaskStatus(customStage || []);
  };

  const getElementStylePriority = priority => {
    let color = "";
    switch (priority) {
      case "low":
        color = "#D3D3D3";
        break;
      case "high":
        color = "#CF513D";
        break;
      case "medium":
        color = "#6082B6";
        break;

      default:
        color = "#6082B6";
        break;
    }

    return `<div class="priority" style="background: ${color}"></div>`;
  };

  const getFirstLetters = str => {
    if (!str) return "";

    const firstLetters = str
      .split(" ")
      .map(word => word[0])
      .join("");

    return firstLetters;
  };

  const getElementAvatarAssignees = assignees => {
    if (!assignees || assignees.length === 0) return "";

    const assigneesElement = assignees.map(item => {
      const avatar = item?.avatar?.url;
      return avatar
        ? `<div class="avatar"><img
      alt=""
      width="100%"
      height="100%"
      src="${avatar}"
    /></div>`
        : `<div class="avatar-name">${getFirstLetters(
            item?.fullName?.toUpperCase() || "N/A"
          )}</div>`;
    });

    return `<div class="assignees">${assigneesElement.join("")}</div>`;
  };

  useEffect(() => {
    const customTasks = tasks.map(task => {
      let elementImages = "";
      if (task?.attachments?.length >= 0) {
        const images = task?.attachments?.filter(
          file => getFileType(file?.name)?.type === "image"
        );

        elementImages =
          !images || images?.length === 0
            ? ""
            : `<img
          alt=""
          width="100%"
          height="100%"
          src="${images[0]?.url}"
        />`;
      }

      return {
        objectId: task?.objectId,
        stage: task?.status,
        priority: task?.priority,
        name: task?.name,
        index: task?.index,
        description: task?.description,
        assignees: task?.assignees?.map(assignees => assignees?.fullName),
        innerHtmlTitle: `<div>[${task?.name}]</div>`,
        innerHtmlContent: `<div class="content-wrapper">
          <div class="attachment-image">
           ${elementImages}
          </div>
          ${task?.priority ? getElementStylePriority(task?.priority) : ""}
          <div class="description">${task?.description || ""}</div>
          ${
            task?.assignees?.length > 0
              ? getElementAvatarAssignees(task?.assignees)
              : ""
          }
        </div>`,
      };
    });

    setTaskList(customTasks || []);
  }, [tasks]);

  const handleAddTask = ({ status, index }) => {
    setTaskCreateFilter({
      projectFilterProps: projectSelectedFilter,
      assigneesFilterProps: assigneesSelectedFilter
        ? [assigneesSelectedFilter]
        : [],
      status: status,
      index: index,
    });
    setOpenModal(prev => !prev);
  };

  const handleCreateNewTask = body => {
    dispatch(createTask(body))
      .then(res => {
        if (res?.payload?.objectId) {
          getTask();
          setOpenModal(prev => !prev);
          toastrSuccessAlert("Thêm task thành công!!");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      })
      .catch(error => {
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      });
  };

  const handleUpdateTaskDetail = ({ id, body }) => {
    dispatch(updateTaskDetail({ taskId: id, params: body }))
      .then(res => {
        if (res?.payload?.updatedAt) {
          getTask();
          toastrSuccessAlert("Cập nhật task thành công!!");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      })
      .catch(error => {
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      });

    setTaskId("");
    setOpenModal(prev => !prev);
  };

  const handleUpdateTask = async updateListTask => {
    const localStoredUser = JSON.parse(localStorage.getItem("User"));
    const requests = updateListTask.map(task => ({
      method: "PUT",
      path: `${GET_TASK}/${task.objectId}`,
      body: {
        index: task.index,
        ...(task.newStatus && {
          status: task.newStatus,
        }),
        ...(task.newStatus &&
          task.newStatus === "Hoàn thành" && {
            completedOn: moment().format("YYYY-MM-DD"),
            completedBy: {
              __type: "Pointer",
              className: "_User",
              objectId: localStoredUser.objectId,
            },
          }),
      },
    }));

    dispatch(postBatchAction(requests))
      .then(res => {
        if (res?.payload?.length > 0) {
          getTask();
          toastrSuccessAlert("Cập nhật trạng thái task thành công!!");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      })
      .catch(error => {
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      });
  };

  const handleDeleteTask = ({ objectId }) => {
    dispatch(deleteTask(objectId))
      .then(() => {
        getTask();
      })
      .catch(error => {
        console.log(error);
        toastrErrorAlert("Đã có lỗi xảy ra . Vui lòng thử lại sau !");
      });
  };

  const handleAddNewColumn = async newTitleColumn => {
    if (!newTitleColumn || !sysconfigStageTask?.objectId) return;

    const lengthSysValues = sysconfigStageTask?.Values?.length;
    const newStageTask = [
      ...sysconfigStageTask?.Values,
      {
        id: lengthSysValues + 1 + "",
        text: newTitleColumn,
        value: newTitleColumn,
      },
    ];

    try {
      const res = await httpService.put(
        GET_SYSCFG + `/${sysconfigStageTask.objectId}`,
        {
          Values: newStageTask,
        }
      );
      if (res.updatedAt) {
        getStageTask();
        toastrSuccessAlert("Thêm danh sách thành công");
        return;
      }

      toastrErrorAlert("Đã có lỗi xảy ra . Vui lòng thử lại sau !");
    } catch (error) {
      toastrErrorAlert("Đã có lỗi xảy ra . Vui lòng thử lại sau !");
    }
  };

  const handleTaskClicked = ({ objectId }) => {
    setTaskId(objectId || "");
    setOpenModal(prev => !prev);
  };

  return (
    <React.Fragment>
      <Spacer size={50} />
      <Row
        style={{
          width: "max-content",
        }}
      >
        {/* <form> */}
        <Row>
          <Col md={6} className="d-flex align-items-center">
            <h6
              style={{
                margin: "0",
                marginRight: "16px",
              }}
            >
              Dự án
            </h6>
            <Select
              defaultValue={projectSelectedFilter}
              value={projectSelectedFilter}
              style={{ width: 200 }}
              onChange={handleOnchangeProjects}
              options={projectsFilter || []}
            />
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <h6
              style={{
                margin: "0",
                marginRight: "16px",
                whiteSpace: "nowrap",
              }}
            >
              Nhân viên
            </h6>
            <Select
              defaultValue={assigneesSelectedFilter}
              value={assigneesSelectedFilter}
              style={{ width: 300 }}
              onChange={handleOnchangeAssignees}
              options={assigneesFilter || []}
            />
          </Col>
        </Row>
        {/* </form> */}
      </Row>
      <Row>
        <Kanban
          heightStyleContainer={"172"}
          tasks={taskList}
          taskStatus={taskStatus}
          addTask={handleAddTask}
          updateTask={handleUpdateTask}
          deleteTask={handleDeleteTask}
          openDetailTask={handleTaskClicked}
          addNewColumn={handleAddNewColumn}
        />
      </Row>

      {openModal && (
        <AddNewTask
          id={taskId}
          openModal={openModal}
          toggleModal={toggleModal}
          createNewTask={handleCreateNewTask}
          updateTask={handleUpdateTaskDetail}
          taskCreateFilter={taskCreateFilter}
        />
      )}
    </React.Fragment>
  );
}
