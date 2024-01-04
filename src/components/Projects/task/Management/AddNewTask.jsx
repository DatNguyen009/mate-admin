import React, { useEffect, useState, useMemo } from "react";
import httpService from "services/httpService";
import { Row, Col, ModalBody, ModalFooter } from "reactstrap";
import { Select } from "antd";
import {
  fetchTasks,
  updateTaskStatus,
  deleteTask,
  createTask,
} from "redux-toolkit/slices/Projects/task";
import { useDispatch, useSelector } from "react-redux";
import Spacer from "components/Common/Spacing";
import Kanban from "../OpportunityStatusKanban/Kanban";
import { GET_PROJECT, GET_TASK } from "helpers/url_helper";
import { countTimeSince, getFileType } from "helpers/erp_helper";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import UploadFile from "components/Common/UploadFile";
import { CommonButton } from "components/Common/ButtonCommon";
import ModalCommon from "components/Common/ModalCommon";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { uploadImg } from "helpers/erp_helper";
import Comments from "./Comments";

function AddNewTask({
  id,
  openModal,
  toggleModal,
  createNewTask,
  updateTask,
  taskCreateFilter,
}) {
  const [assigneesFilter, setAssigneesFilter] = useState([]);
  const [assigneesSelectedFilter, setAssigneesSelectedFilter] = useState([]);
  const [showErrorAssignees, setShowErrorAssignees] = useState(false);
  const [attachmentFiles, setAttachmentFiles] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  //Modal add new task
  const schema = yup
    .object({
      project: yup
        .object()
        .nullable()
        .transform((_, val) =>
          val?.objectId
            ? {
                __type: "Pointer",
                className: "Project",
                objectId: val.objectId,
              }
            : null
        )
        .required("Vui lòng chọn dự án!"),
      name: yup.string().required("Vui lòng nhập tên!"),
      description: yup.string().required("Vui lòng nhập mô tả!"),
      //priority: yup.string().required("Vui lòng chọn độ ưu tiên!"),
    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { renderForm } = useGetFormSchema("Task", yup, rest, errors);

  const getTaskDetail = async () => {
    if (!id) return;

    const res = await httpService.get(
      `/parse/classes/Task/${id}?include=["project","assignees"]`
    );
    if (!res) {
      toastrErrorAlert("Task not found!");
      return;
    }

    const { reset } = rest;
    reset({
      // ...res,
      project: res.project
        ? {
            text: res.project?.name,
            objectId: res.project?.objectId,
            className: "Project",
            __type: "Pointer",
          }
        : { text: "" },
      name: res.name,
      description: res.description,
      priority: res.priority,
    });

    setAttachmentFiles(res.attachments?.length > 0 ? [...res.attachments] : []);

    if (!res.project || res.project.length === 0) {
      setAssigneesFilter([]);
      setAssigneesSelectedFilter([]); //reset
      return;
    }

    getAssigneesFilter(res.project?.objectId);
    setAssigneesSelectedFilter(res.assignees?.map(item => item.objectId) || []);
  };

  const bindingTaskCreateFilter = async () => {
    const { projectFilterProps, assigneesFilterProps } = taskCreateFilter;

    if (id || !projectFilterProps) return;

    const projects = await getProjects(projectFilterProps);

    const { reset } = rest;
    reset({
      project:
        projects.length > 0
          ? {
              text: projects[0]?.name,
              objectId: projects[0]?.objectId,
              className: "Project",
              __type: "Pointer",
            }
          : { text: "" },
    });

    bindingAssigneesFilter(projects);
    const assigneesSelected = projects[0]?.members
      .filter(m => assigneesFilterProps.includes(m.objectId))
      ?.map(item => item.objectId);

    setAssigneesSelectedFilter(assigneesSelected || []);
  };

  useEffect(() => {
    getTaskDetail();
    bindingTaskCreateFilter();
  }, []);

  const onSubmit = async values => {
    try {
      // if (!assigneesSelectedFilter || assigneesSelectedFilter.length === 0) {
      //   setShowErrorAssignees(true);
      //   return;
      // }

      const currentFiles = attachmentFiles.filter(file => file.createdAt);
      const files = await handleCustomAttachments();

      const body = {
        ...values,
        status: taskCreateFilter?.status || "open",
        index: taskCreateFilter?.index,
        attachments: [...currentFiles, ...files],
        ...(assigneesSelectedFilter.length > 0 && {
          assignees: assigneesSelectedFilter.map(id => ({
            __type: "Pointer",
            className: "Employee",
            objectId: id,
          })),
        }),
      };

      if (id) {
        const { status, index, ...customBody } = body;
        updateTask({ id, body: customBody });
      } else {
        createNewTask(body);
      }

      handleClearModal();
    } catch (error) {
      console.log("error111", error);
    }
  };

  const handleClearModal = () => {
    const { reset } = rest;
    reset({
      name: "",
      project: null,
      priority: "",
      description: "",
    });
    setAttachmentFiles([]);
    setAssigneesFilter([]);
    setAssigneesSelectedFilter([]);
  };

  const getAssigneesFilter = async projectId => {
    if (!projectId) return;

    const projects = await getProjects(projectId);
    bindingAssigneesFilter(projects);
  };

  const getProjects = async projectId => {
    if (!projectId) return [];

    const optional = {
      params: {
        include: "members",
        where: {
          objectId: projectId,
        },
      },
    };
    const { results: projects } = await httpService.get(GET_PROJECT, optional);

    return projects || [];
  };

  const bindingAssigneesFilter = projects => {
    if (!projects || projects.length === 0) {
      setAssigneesFilter([]);
      setAssigneesSelectedFilter([]); //reset
      return;
    }

    const members = projects[0].members.map(m => {
      return {
        label: `${m.fullName} (${m.employeeId})`,
        value: m.objectId,
      };
    });

    setAssigneesFilter(members);
  };

  const includeFunctions = {
    project: {
      disabled: !id && taskCreateFilter?.projectFilterProps ? true : false,
      onSelect: e => {
        getAssigneesFilter(e?.objectId);
        setAssigneesSelectedFilter([]); //reset
      },
    },
  };

  const handleOnchangeAssignees = values => {
    const isCorrect = values
      .map(value => assigneesFilter.find(item => item.value === value))
      .filter(item => item)
      .map(item => item.value);

    setAssigneesSelectedFilter([...isCorrect]);
    //setShowErrorAssignees(false);
  };

  const handleArchiveTask = isArchive => {
    if (!id) return;

    const body = { isArchive: isArchive };
    updateTask({ id, body });
  };

  const handleUploadFileTask = file => {
    setAttachmentFiles(prev => [...prev, file]);
  };

  const handleCustomAttachments = async () => {
    if (attachmentFiles && attachmentFiles.length === 0) return [];
    const filterAttachments = attachmentFiles.filter(file => !file.createdAt);
    if (filterAttachments && filterAttachments.length === 0) return [];

    try {
      const attachments = [];
      for (const file of filterAttachments) {
        const newFile = await uploadImg(file);
        if (!newFile) continue;

        attachments.push({
          name: file.name,
          createdAt: new Date().toISOString(),
          url: newFile.url,
          uniqueName: newFile.name,
        });
      }

      return attachments;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleDeleteAttachment = ({ e, item }) => {
    e.stopPropagation();
    if (!item) return;

    const fileDeleteIndex = attachmentFiles?.findIndex(file =>
      item?.uniqueName
        ? file.uniqueName && file.uniqueName === item?.uniqueName
        : file.preview && file.preview === item?.preview
    );

    const [removed] = attachmentFiles.splice(fileDeleteIndex, 1);

    setAttachmentFiles([...attachmentFiles]);
  };

  const handleOpenAttachment = item => {
    if (!item?.createdAt) {
      toastrErrorAlert("Không thể xem trước file chưa lưu");
      return;
    }

    if (!item?.url) {
      toastrErrorAlert("Không tìm thấy đường dẫn");
      return;
    }

    item?.fileType?.type === "image"
      ? setImagePreviewUrl(item?.url)
      : window.open(item?.url);
  };

  const attachmentFilesElement = useMemo(() => {
    if (attachmentFiles && attachmentFiles.length === 0) return null;

    let commentsElement = (
      <div className="attachments">
        <div className="attachment-title">
          <span className="icon">
            <i className="bx bx-file"></i>
          </span>
          <h3 className="title">Các tập tin đính kèm</h3>
        </div>
        {attachmentFiles?.map((item, index) => {
          const fileType = getFileType(item?.name);

          return (
            <div key={index} className="attachment-wrapper">
              <div
                className="content-wrapper"
                onClick={() =>
                  handleOpenAttachment({ ...item, fileType: fileType })
                }
              >
                <div className={`attachment-file ${fileType?.type || ""}`}>
                  {fileType?.type === "image" ? (
                    <img
                      alt=""
                      src={item?.createdAt ? item?.url : item?.preview}
                    />
                  ) : (
                    <span>{fileType?.extension || "N/A"}</span>
                  )}
                </div>
                <div className="attachment-actions">
                  <div className="action-wrapper">
                    <span className="file-name">{item?.name}</span>
                  </div>
                  <div className="action-wrapper">
                    {item?.createdAt ? (
                      <span className="text time">
                        {countTimeSince(item?.createdAt)}
                      </span>
                    ) : (
                      <span className="text unsaved">chưa lưu</span>
                    )}
                    <span
                      className="text"
                      onClick={e => handleDeleteAttachment({ e, item })}
                    >
                      Xóa
                    </span>
                  </div>
                  {fileType?.type === "image" && (
                    <div className="action-wrapper buttons">
                      <span className="icon">
                        <i className="bx bxs-image"></i>
                      </span>
                      <span className="text">Đặt ảnh bìa</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="clear-right"></div>
            </div>
          );
        })}
      </div>
    );

    return commentsElement;
  }, [attachmentFiles]);

  const imagePreviewElement = useMemo(() => {
    if (!imagePreviewUrl) return null;

    return (
      <div className="attachment-viewer">
        <div className="attachment-viewer-header">
          <span className="close-icon" onClick={() => setImagePreviewUrl(null)}>
            <i className="bx bx-window-close"></i>
          </span>
        </div>
        <div className="attachment-viewer-underlay"></div>
        <div className="attachment-viewer-frames">
          <div className="attachment-viewer-frames-item">
            <div className="attachment-viewer-frames-item-preview-wrapper">
              <div className="attachment-viewer-frames-item-preview-wrapper-image">
                <img alt="" src={imagePreviewUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [imagePreviewUrl]);

  return (
    <React.Fragment>
      <ModalCommon
        size="lg"
        modalTitle={!id ? "Thêm task mới" : "Cập nhật task"}
        isShowModal={openModal}
        onClose={e => {
          toggleModal(e);
          handleClearModal();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            {renderForm([], includeFunctions)}
            <div className="employee-filter-wrapper">
              <h6>Nhân viên</h6>
              <Select
                getPopupContainer={trigger => trigger.parentNode}
                mode="tags"
                defaultValue={assigneesSelectedFilter}
                value={assigneesSelectedFilter}
                style={{ width: "50%", paddingRight: "12px" }}
                onChange={handleOnchangeAssignees}
                tokenSeparators={[","]}
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                    0 ||
                  option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                options={assigneesFilter || []}
                disabled={
                  !id && taskCreateFilter?.assigneesFilterProps?.length > 0
                }
              />
              {showErrorAssignees && (
                <h6
                  style={{
                    color: "red",
                    fontWeight: "500",
                  }}
                >
                  Vui lòng chọn nhân viên!
                </h6>
              )}
            </div>
            <div className="task-kanban-attachments">
              {attachmentFilesElement}
              <UploadFile onUploaded={handleUploadFileTask} />
              {imagePreviewElement}
            </div>
            {id && (
              <div className="task-kanban-activities">
                <div className="task-kanban-comments">
                  <Comments taskId={id} />
                </div>
                <div className="task-kanban-actions">
                  <div className="actions-wrapper">
                    <h3 className="header">Thao tác</h3>
                    <div
                      className="wrapper"
                      onClick={() => handleArchiveTask(true)}
                    >
                      <span className="icon">
                        <i className="bx bx-archive-in"></i>
                      </span>
                      <span className="action-name">Lưu trữ</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <CommonButton style={{ background: "green" }} level={2}>
              {!id ? "Thêm" : "Cập nhật"}
            </CommonButton>
          </ModalFooter>
        </form>
      </ModalCommon>
    </React.Fragment>
  );
}

AddNewTask.propTypes = {
  id: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  createNewTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  taskCreateFilter: PropTypes.object,
};

export default AddNewTask;
