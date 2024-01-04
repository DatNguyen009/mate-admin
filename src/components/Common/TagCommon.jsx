import React, { useState } from "react";
import { CommonText } from "components/Common/TextCommon";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spacer from "./Spacing";

const Tag = styled.div`
  margin: 0.2rem;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.6rem 0.8rem;
  background-color: #2590ef;
  color: #fff;
  border-radius: 6px;
  box-shadow: 2px 2px 3px 0px #00000042;
`;
const TagCommon = ({ content, onDismiss = () => {} }) => {
  const [visible, setVisible] = useState(true);

  const handleDismissClicked = () => {
    setVisible(false);
    onDismiss(content);
  };

  return (
    <Tag isOpen={visible}>
      <CommonText mt={0}>{content}</CommonText>
      <Spacer size={10} />
      <div onClick={handleDismissClicked} className="d-flex align-items-center">
        <i className="bx bx-x" />
      </div>
    </Tag>
  );
};

TagCommon.propTypes = {
  content: PropTypes.string,
  onDismiss: PropTypes.func,
};
export default TagCommon;
