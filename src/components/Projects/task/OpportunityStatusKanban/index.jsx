import React, { useEffect, useState } from "react";
import httpService from "services/httpService";
import { Row } from "reactstrap";
import {
  fetchOpportunities,
  deleteOpportunity,
  postBatchAction,
} from "redux-toolkit/slices/CRM/OpportunitySlice";
import { useDispatch, useSelector } from "react-redux";
import Spacer from "components/Common/Spacing";
import Kanban from "./Kanban";
import {
  GET_OPPORTUNITY,
  GET_OPPORTUNITY_INCLUDE,
  GET_SYSCFG,
} from "helpers/url_helper";
import {
  toastrErrorAlert,
  toastrSuccessAlert,
} from "components/Common/AlertToastr";
import { useHistory } from "react-router-dom";

export default function OpportunityStatusKanban() {
  const [opportunityList, setOpportunityList] = useState([]);
  const [taskStatus, setTaskStatus] = useState([]);
  const [sysconfigStageOpp, setSysconfigStageOpp] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const opportunities = useSelector(state => state.Opportunity.opportunities);

  useEffect(() => {
    getOpportunity();
    getStageOpportunity();
  }, []);

  useEffect(() => {
    if (opportunities?.length > 0) {
      const customOpportunity = opportunities.map(opp => {
        return {
          objectId: opp?.objectId,
          stage: opp?.stage,
          index: opp?.index,
          clientName: opp?.client?.fullName || opp?.lead?.name,
          oppName: `Tên cơ hội : ${opp?.name}`,
          typeCategory: `Loại sản phẩm : ${opp?.productCategory?.name}`,
          innerHtmlTitle: `${opp?.client?.fullName || opp?.lead?.name}`,
          innerHtmlContent: `<div>
          <div>Tên cơ hội : ${opp?.name}</div>
          <div>Loại sản phẩm : ${opp?.productCategory?.name}</div>
          </div>`,
        };
      });

      setOpportunityList(customOpportunity || []);
    }
  }, [opportunities?.length]);

  const getOpportunity = async () => {
    dispatch(fetchOpportunities(GET_OPPORTUNITY_INCLUDE));
  };

  const getStageOpportunity = async () => {
    const { results: stageOpportunity } = await httpService.get(
      '/parse/classes/SysCfg?where={"Category":"stageOpportunity"}'
    );
    setSysconfigStageOpp(stageOpportunity[0]);
    const customStage = stageOpportunity[0]?.Values?.map(stage => {
      return {
        id: +stage.id,
        text: stage.text,
        value: stage.value,
      };
    }).sort((a, b) => a.id - b.id);
    setTaskStatus(customStage || []);
  };

  const handleAddTask = () => {
    history.push("/opportunity/new-opportunity");
  };

  const handleUpdateTask = async updateListTask => {
    const requests = updateListTask.map(task => ({
      method: "PUT",
      path: `${GET_OPPORTUNITY}/${task.objectId}`,
      body: {
        index: task.index,
        ...(task.newStatus && {
          stage: task.newStatus,
        }),
      },
    }));

    dispatch(postBatchAction(requests))
      .then(res => {
        if (res?.payload?.length > 0) {
          dispatch(fetchOpportunities(GET_OPPORTUNITY_INCLUDE));
          toastrSuccessAlert("Cập nhật trạng thái cơ hội thành công!!");
          return;
        }
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      })
      .catch(error => {
        toastrErrorAlert("Đã xảy ra lỗi. Vui lòng thử lại sau!!");
      });
  };

  const handleDeleteTask = ({ objectId }) => {
    dispatch(deleteOpportunity(objectId))
      .then(() => {
        dispatch(fetchOpportunities(GET_OPPORTUNITY_INCLUDE));
      })
      .catch(error => {
        console.log(error);
        toastrErrorAlert("Đã có lỗi xảy ra . Vui lòng thử lại sau !");
      });
  };

  const handleTaskClicked = ({ objectId }) => {
    history.push(`/opportunity/${objectId}`);
  };

  const handleAddNewColumn = async newTitleColumn => {
    if (!newTitleColumn || !sysconfigStageOpp?.objectId) return;

    const newStageOpp = [
      ...sysconfigStageOpp?.Values,
      {
        text: newTitleColumn,
        value: newTitleColumn,
      },
    ];

    try {
      const res = await httpService.put(
        GET_SYSCFG + `/${sysconfigStageOpp.objectId}`,
        {
          Values: newStageOpp,
        }
      );
      if (res.updatedAt) {
        getStageOpportunity();
        toastrSuccessAlert("Thêm danh sách thành công");
        return;
      }

      toastrErrorAlert("Đã có lỗi xảy ra . Vui lòng thử lại sau !");
    } catch (error) {
      toastrErrorAlert("Đã có lỗi xảy ra . Vui lòng thử lại sau !");
    }
  };

  return (
    <React.Fragment>
      <Spacer size={50} />
      <Row>
        <Kanban
          heightStyleContainer={"140"}
          tasks={opportunityList}
          taskStatus={taskStatus}
          addTask={handleAddTask}
          updateTask={handleUpdateTask}
          deleteTask={handleDeleteTask}
          openDetailTask={handleTaskClicked}
          addNewColumn={handleAddNewColumn}
        />
      </Row>
    </React.Fragment>
  );
}
