import React from "react";
import { Card, Col, Row } from "reactstrap";
import CardTitleInfo from "components/Common/CardTitleInfo";
import CardTextInfo from "components/Common/CardTextInfo";
import Spacing from "components/Common/Spacing";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CardReportsMasters(props) {
  const { title, dataProject } = props;
  return (
    <React.Fragment>
      <Row>
        <h2 className="cardShortcut__title">{title}</h2>
        {dataProject?.map((item, index) => {
          const dataItem = item.BoxTags;
          return (
            <Col md={4} key={index}>
              <Card body style={{ height: "calc(100% - 24px)" }}>
                <CardTitleInfo title={item.title}></CardTitleInfo>
                <Spacing size={15}></Spacing>
                {dataItem?.map((item, index) => (
                  <Link
                    to={item.path || ""}
                    key={"item" + index}
                    style={{ color: "black" }}
                  >
                    <CardTextInfo text={item.itemBoxTag}></CardTextInfo>
                  </Link>
                ))}
              </Card>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
}

CardReportsMasters.propTypes = {
  title: PropTypes.string,
  dataProject: PropTypes.array,
};
