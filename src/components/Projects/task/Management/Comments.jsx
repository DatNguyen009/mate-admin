import React, { useEffect, useState, useMemo } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import httpService from "services/httpService";
import { CommonTextarea } from "components/Common/inputCommon";
import { GET_TASK_COMMENT, GET_EMPLOYEE } from "helpers/url_helper";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskComments,
  createTaskComment,
  deleteTaskComment,
} from "redux-toolkit/slices/Projects/taskComment";
import moment from "moment";

function Comments({ taskId }) {
  const dispatch = useDispatch();
  const taskComments = useSelector(state => state.TaskComment.taskComments);
  const [inputComment, setInputComment] = useState("");
  const [employeeComment, setEmployeeComment] = useState(null);

  const getTaskComments = () => {
    if (!taskId) return;

    const optional = {
      params: {
        include: "employee",
        order: "-createdAt",
        where: {
          ...(taskId && {
            task: {
              __type: "Pointer",
              className: "Task",
              objectId: taskId,
            },
          }),
        },
      },
    };

    dispatch(fetchTaskComments(optional));
  };

  useEffect(() => {
    getTaskComments();
  }, []);

  useEffect(async () => {
    let localStoredUser = JSON.parse(localStorage.getItem("User"));
    const optional = {
      params: {
        include: "user",
        where: {
          ...(localStoredUser?.objectId && {
            user: {
              __type: "Pointer",
              className: "_User",
              objectId: localStoredUser?.objectId,
            },
          }),
        },
      },
    };

    const { results: employee } = await httpService.get(GET_EMPLOYEE, optional);

    setEmployeeComment(employee[0]);
  }, []);

  const handleOnChangeComment = async e => {
    setInputComment(e.target.value);
  };

  const handleAddComment = async e => {
    e.stopPropagation();
    if (!inputComment) return;

    const body = {
      ...(taskId && {
        task: {
          __type: "Pointer",
          className: "Task",
          objectId: taskId,
        },
      }),
      ...(employeeComment?.objectId && {
        employee: {
          __type: "Pointer",
          className: "Employee",
          objectId: employeeComment?.objectId,
        },
      }),
      content: inputComment,
    };

    dispatch(createTaskComment(body))
      .then(res => {
        if (res?.payload?.objectId) {
          getTaskComments();
          setInputComment("");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      })
      .catch(error => {
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      });
  };

  const handleDeleteComment = ({ objectId }) => {
    dispatch(deleteTaskComment(objectId))
      .then(() => {
        getTaskComments();
      })
      .catch(error => {
        console.log(error);
        toastrErrorAlert("Đã có lỗi xảy ra . Vui lòng thử lại sau !");
      });
  };

  const getFirstLetters = str => {
    if (!str) return "";

    const firstLetters = str
      .split(" ")
      .map(word => word[0])
      .join("");

    return firstLetters;
  };

  function timeSince(date) {
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " năm";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " tháng";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " ngày";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " giờ";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " phút";
    }

    if (Math.floor(seconds) <= 60) return "vừa xong";

    return Math.floor(seconds) + " giấy";
  }

  const taskCommentsElement = useMemo(() => {
    if (taskComments && taskComments.length === 0) return null;

    let commentsElement = taskComments?.map((item, index) => (
      <div key={index} className="comment-wrapper">
        <div className="comment-avatar">
          {getFirstLetters(item?.employee?.fullName?.toUpperCase()) || "N/A"}
        </div>
        <div className="comment-content">
          <div className="header">
            <div className="username">{item?.employee?.fullName || "N/A"}</div>
            <div className="time">{timeSince(item?.createdAt) || ""}</div>
          </div>
          <div className="comment-container">
            <div className="comment-wrapper">
              <div className="current-comment">
                <p>{item?.content}</p>
              </div>
            </div>
          </div>
          {item?.employee?.objectId === employeeComment?.objectId && (
            <div className="comment-action">
              <div className="action-wrapper">
                <Popconfirm
                  onConfirm={() =>
                    handleDeleteComment({ objectId: item?.objectId })
                  }
                  title="Xóa vĩnh viễn bình luận"
                  showCancel={false}
                  okText="Xác nhận"
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                >
                  <span>Xóa</span>
                </Popconfirm>
              </div>
            </div>
          )}
        </div>
      </div>
    ));

    return commentsElement;
  }, [taskComments, employeeComment]);

  return (
    <React.Fragment>
      <div className="new-comment">
        <div className="new-comment-wrapper">
          <div className="new-comment-avatar">
            {getFirstLetters(employeeComment?.fullName?.toUpperCase()) || "N/A"}
          </div>
          <div className="new-comment-content">
            <div className="new-comment-container">
              <div className="input-new-comment">
                <CommonTextarea
                  onChange={handleOnChangeComment}
                  value={inputComment}
                  placeholder="Viết bình luận..."
                ></CommonTextarea>
              </div>
              <div className="btn-new-comment">
                <button
                  type="button"
                  disabled={!inputComment}
                  onClick={handleAddComment}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="list-comment-kanban">{taskCommentsElement}</div>
    </React.Fragment>
  );
}

Comments.propTypes = {
  taskId: PropTypes.string.isRequired,
};

export default Comments;
