import React from "react";
import { Col, Container, Row } from "reactstrap";
import Tag from "./Tag";
import PropTypes from "prop-types";

function TagsBox({ listData }) {
  return (
    <Container fluid="xl">
      <Row>
        {listData.map((entry, i) => (
          <Col key={i}>
            {entry.title || ""}
            {entry.tags.map((tag, i) => (
              <Tag key={i} to={tag.linkTo}>
                {tag.name}
              </Tag>
            ))}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
TagsBox.propTypes = {
  listData: PropTypes.array,
};
export default TagsBox;
