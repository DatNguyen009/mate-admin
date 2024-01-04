import React from "react";
import PropTypes from "prop-types";
import styles from "./TaskBox.module.scss";
import { Card, Col, Container, Row } from "reactstrap";
import { CommonText } from "../TextCommon";

function TaskBox({ title, status }) {
  return (
    <div className={styles.TaskBox}>
      <Card className={styles.card} body>
        <div className={styles.cardTitle}>
          <CommonText level={2} mt={0} color="#72777b">
            {title}
          </CommonText>
          <div className={styles.left}>Đang làm</div>
        </div>
        <div className={styles.cardContent}>
          <div>Tiến độ: </div>
          <div>Độ ưu tiên: </div>
          <div>Người giao: </div>
        </div>
      </Card>
    </div>
  );
}

TaskBox.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
};
TaskBox.defaultProps = {
  title: "",
  status: "",
};

export default TaskBox;
