import IChart from "../Charts";
import { types } from "./constants";
import React from "react";
import styles from "./InformationCard.module.scss";
import { Container, Row } from "reactstrap";
import TaskBox from "../Taskbox";
import VVSTable from "components/form-control/VVSTable";

export const renderType = (type, children, data, filter) => {
  switch (type) {
    case types.TASK:
      return (
        <>
          <Container fluid>
            <Row className={`${styles.containerTask} m-0 p-3`}>
              <TaskBox title={"Task-12"} />
            </Row>
          </Container>
        </>
      );
      break;
    case types.CHART:
      return (
        filter?.type.length && (
          <>
            <div>
              <IChart type={filter?.type} dataChart={data} />
            </div>
          </>
        )
      );
      break;
    default:
      return children;
      break;
  }
};
