import VVSTable from "components/form-control/VVSTable";
import OpportunityStatusKanban from "components/Projects/task/OpportunityStatusKanban";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { TabsSwitch } from "components/Common/TabsSwitch";

export default function Opportunity() {
  const [enableKanbanView, setEnableKanbanView] = useState(true);

  const swapView = key => {
    setEnableKanbanView(prev => !prev);
  };

  const tabList = [
    {
      key: 0,
      title: "Kanban view",
    },
    {
      key: 1,
      title: "List view",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div
            className="d-flex align-items-center"
            style={{ position: "absolute", height: "38px" }}
          >
            <h4 style={{ margin: "0" }}>Cơ hội</h4>
          </div>
          <div
            className="d-flex align-items-center"
            style={{
              position: "absolute",
              zIndex: "10",
              left: "50%",
              height: "38px",
              width: `${tabList?.length * 150}px`,
            }}
          >
            {/* <h4
              className="my-0 font-size-18 text-capitalize"
              style={{ color: `${enableKanbanView ? "#2490ef" : "gray"}` }}
            >
              {"Kanban view"}
            </h4>
            <button
              className="btn d-flex align-items-center justify-content-center"
              onClick={swapView}
              style={{
                color: "#2490ef",
                margin: "0 10px",
                height: "38px",
                width: "38px",
              }}
            >
              <i
                className={`bx bxs-toggle-${
                  enableKanbanView ? "left" : "right"
                }`}
                style={{ fontSize: "30px" }}
              ></i>
            </button>
            <h4
              className="my-0 font-size-18 text-capitalize"
              style={{ color: `${enableKanbanView ? "gray" : "#2490ef"}` }}
            >
              {"List view"}
            </h4> */}
            <TabsSwitch
              tabList={tabList}
              defaultActiveKey={0}
              style={{ height: 38, padding: 6 }}
              onChange={swapView}
            />
          </div>
          {enableKanbanView ? (
            <OpportunityStatusKanban />
          ) : (
            <VVSTable title="" name="Opportunity" />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
}
