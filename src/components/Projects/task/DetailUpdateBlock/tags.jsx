import { CommonInput, CommonLabel } from "components/Common/inputCommon";
import TagCommon from "components/Common/TagCommon";
import React, { useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col } from "reactstrap";
import Spacer from "components/Common/Spacing";
import styled from "styled-components";

const TagInput = styled(CommonInput)`
  width: 80px;
  height: 30px;
`;

function Tags({ initialTags, onChange }) {
  const [tags, setTags] = useState([]);

  useLayoutEffect(() => {
    setTags(initialTags);
  }, [JSON.stringify(initialTags)]);

  const handleTagOnBlur = e => {
    const regex = /^\s*$/;
    if (regex.test(e.target.value)) return;

    const newTags = [...tags, e.target.value];
    setTags(newTags);
    onChange(newTags);
    e.target.value = "";
  };

  const handleTagOnDismiss = removeTag => {
    const restTags = tags?.filter(tag => removeTag !== tag);
    setTags(restTags);
    onChange(restTags);
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <CommonLabel
          style={{ margin: 0 }}
          className="d-flex align-items-center"
          for="tag"
        >
          <i
            className="bx bx-purchase-tag"
            style={{
              fontSize: "20px",
              marginRight: "10px",
            }}
          ></i>
          <p style={{ marginBottom: 0 }}>Tag</p>
        </CommonLabel>
        <Spacer size={20} />
        <TagInput id="tag" onBlur={handleTagOnBlur} autoComplete="true" />
      </div>
      <Spacer size={20} />
      <Col xs={12} className="d-flex flex-wrap">
        {tags?.map((tag, index) => (
          <TagCommon
            key={tag + index}
            content={tag}
            onDismiss={handleTagOnDismiss}
          />
        ))}
      </Col>
    </div>
  );
}

Tags.propTypes = {
  initialTags: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};
export default Tags;
