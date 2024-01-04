import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { Container } from "reactstrap";
import { Input } from "antd";
import { CommonText } from "components/Common/TextCommon";
import Spacer from "components/Common/Spacing";
import classNames from "classnames";
import { sortBy } from "lodash";

const getColumnsData = (tasks, taskStatus) => {
  return taskStatus.reduce((columns, stage) => {
    columns[stage?.value] = {
      title: stage?.text,
      value: stage?.value,
      items: sortBy(
        tasks.filter(task => task.stage === stage?.value),
        e => e.index
      ),
    };
    return columns;
  }, {});
};

const Kanban = ({
  heightStyleContainer,
  tasks,
  taskStatus,
  addTask,
  updateTask,
  deleteTask,
  openDetailTask,
  addNewColumn,
}) => {
  const [columns, setColumns] = useState();
  const inputRef = useRef(null);
  const [openAddNewColumn, setOpenAddNewColumn] = useState(false);
  const [titleNewColumn, setTitleNewColumn] = useState("");

  useEffect(() => {
    if (!taskStatus.length) return;

    const columns = getColumnsData(tasks, taskStatus);
    setColumns(columns);
  }, [tasks, taskStatus]);

  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    let updateListTask = [];
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      const updatedItem = Object.assign({}, removed, {
        newStatus: destColumn.value,
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

      updateListTask = [
        ...sourceItems.map((item, index) => {
          return {
            objectId: item.objectId,
            index,
          };
        }),
        ...destItems.map((item, index) => {
          return {
            objectId: item.objectId,
            index,
            ...(item.objectId === updatedItem?.objectId && {
              newStatus: updatedItem?.newStatus,
            }),
          };
        }),
      ];
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

      updateListTask = copiedItems.map((item, index) => {
        return {
          objectId: item.objectId,
          index,
        };
      });
    }

    updateTask(sortBy(updateListTask, e => e.newStatus));
  };

  const handleOpenAddTitle = () => {
    inputRef.current.focus();
    setOpenAddNewColumn(prev => !prev);
  };

  const handleOnChangeTitle = e => {
    setTitleNewColumn(e.target.value);
  };

  const handleAddColumn = () => {
    if (!titleNewColumn) {
      inputRef.current.focus();
      return;
    }

    addNewColumn(titleNewColumn);
    setOpenAddNewColumn(prev => !prev);
    setTitleNewColumn("");
  };

  return (
    !isEmpty(columns) && (
      <DragDropContext
        onDragEnd={result => {
          onDragEnd(result, columns, setColumns);
        }}
      >
        <Spacer size={10} />
        <Container
          fluid
          style={{
            position: "relative",
            minHeight: `calc(100vh - ${heightStyleContainer || "140"}px)`,
          }}
        >
          <div className="task-kanban-columns">
            {Object.entries(columns).map(([columnId, column], index) => (
              <div key={index} className="task-list-wrapper">
                <div className="task-list-content">
                  <CommonText level={1} className="header-column">
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
                          <TaskCard
                            key={index}
                            item={item}
                            index={index}
                            deleteTask={deleteTask}
                            openDetailTask={openDetailTask}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div
                    className="add-button"
                    onClick={() =>
                      addTask({
                        status: column.value,
                        index: column?.items?.length,
                      })
                    }
                  >
                    <h4>+ Thêm thẻ</h4>
                  </div>
                </div>
              </div>
            ))}
            <div
              className={`task-list-wrapper mod-add ${
                !openAddNewColumn && "is-idle"
              }`}
            >
              <span className="placeholder-add" onClick={handleOpenAddTitle}>
                <span className="icon-sm icon-add">+ Thêm danh sách khác</span>
              </span>
              <Input
                ref={inputRef}
                placeholder="Nhập tiêu đề danh sách..."
                value={titleNewColumn}
                onChange={handleOnChangeTitle}
                className="list-name-input"
              />
              <div className="list-controls">
                <button
                  onClick={handleAddColumn}
                  type="button"
                  className="btn-add-column"
                >
                  Thêm danh sách
                </button>
                <div
                  className="icon-cancel"
                  onClick={() => setOpenAddNewColumn(prev => !prev)}
                ></div>
              </div>
            </div>
          </div>
        </Container>
      </DragDropContext>
    )
  );
};

Kanban.propTypes = {
  heightStyleContainer: PropTypes.string,
  tasks: PropTypes.array.isRequired,
  taskStatus: PropTypes.array.isRequired,
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  openDetailTask: PropTypes.func.isRequired,
  addNewColumn: PropTypes.func.isRequired,
};
export default Kanban;
