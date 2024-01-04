import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "components/Projects/task/kanban/TaskCard";
import PropTypes from "prop-types";
import useReuseData from "custom-hook/useReuseData";
import { fetchSysCfg } from "redux-toolkit/slices/SysCfgSlice/SysCfgSlice";
import { isEmpty } from "lodash";
import {
  updateTaskOrder,
  updateTaskStatus,
} from "redux-toolkit/slices/Projects/task";
import { useDispatch } from "react-redux";
import { Container } from "reactstrap";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "components/Common/Spacing";
import classNames from "classnames";

const getColumnsData = (tasks, taskStatus) => {
  return taskStatus.reduce((columns, status) => {
    columns[status] = {
      title: status,
      items: tasks
        .filter(task => task.status === status)
        .sort((a, b) => a.order - b.order),
    };
    return columns;
  }, {});
};

const TaskKanban = ({ tasks }) => {
  const { taskStatus } = useReuseData(fetchSysCfg, "SysCfgToolkit");
  const [columns, setColumns] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!tasks || !taskStatus.length) return;

    const columns = getColumnsData(tasks, taskStatus);
    setColumns(columns);
  }, [tasks, taskStatus]);

  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);
      const updatedItem = Object.assign({}, removed, {
        status: destColumn.title,
      });
      destItems.splice(destination.index, 0, updatedItem);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      dispatch(
        updateTaskStatus({
          taskId: updatedItem.objectId,
          newStatus: updatedItem.status,
        })
      );
      dispatch(updateTaskOrder([sourceItems, destItems]));
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });

      dispatch(updateTaskOrder([copiedItems]));
    }
  };

  return (
    !isEmpty(columns) && (
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        <Spacer size={10} />
        <Container fluid>
          <div className="task-kanban-columns">
            {Object.entries(columns).map(([columnId, column], index) => (
              <div key={index} className="task-list">
                <CommonText
                  level={1}
                  style={{ textTransform: "capitalize", margin: 10 }}
                >
                  {column.title}
                </CommonText>
                <Droppable key={columnId} droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      className={classNames(
                        "droppable-container",
                        snapshot.isDraggingOver && "isDraggingOver"
                      )}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {column.items.map((item, index) => (
                        <TaskCard key={index} item={item} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </Container>
      </DragDropContext>
    )
  );
};

TaskKanban.propTypes = {
  tasks: PropTypes.array.isRequired,
};
export default TaskKanban;
