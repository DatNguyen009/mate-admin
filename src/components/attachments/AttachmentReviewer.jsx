import AvatarCommon from "components/Common/AvatarCommon";
import { CommonText } from "components/Common/TextCommon";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const IMG_TYPE = "image";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 10px;

  width: fit-content;
  padding: 0.4rem 0.6rem;

  border-radius: 6px;
  border: 1px solid #c2c2c238;
  background-color: #fff;
  box-shadow: 2px 2px 3px 0px #00000042;

  .delete-icon-box {
    opacity: 0;
    transition: all 0.2s;
  }
  &:hover {
    .delete-icon-box {
      opacity: 1;
    }
  }
`;

const DeleteIconBox = styled.div`
  position: absolute;
  top: -8px;
  right: -3px;
  width: fit-content;
  color: red;
  cursor: pointer;
`;

const truncateFileName = (name, maxLength = 10) => {
  if (name.length < maxLength + 3) return name;

  const nameSplit = name.split(".");
  const fileExtension = nameSplit[nameSplit.length - 1];
  const truncateName = name.substring(0, maxLength);
  return `${truncateName}... .${fileExtension}`;
};

const isFileImg = type => {
  const fileType = type.split("/")[0];
  return fileType === IMG_TYPE;
};

function AttachmentReviewer({ file, onDelete }) {
  return (
    <Container>
      <div>
        {isFileImg(file.type) ? (
          <AvatarCommon
            style={{ borderRadius: 4 }}
            config={{ size: 38, borderWidth: 2, borderColor: "black" }}
            src={file.url}
          />
        ) : (
          <i className="far fa-file fa-3x" />
        )}
      </div>
      <div>
        <CommonText mt={0}>{truncateFileName(file.originName)}</CommonText>
        <p className="mb-0" style={{ color: "grey" }}>
          <CommonText mt={0}>{file.size}</CommonText>
        </p>
      </div>
      <DeleteIconBox
        className="delete-icon-box"
        onClick={() => {
          onDelete(file);
        }}
      >
        <i className="fas fa-times-circle" />
      </DeleteIconBox>
    </Container>
  );
}

AttachmentReviewer.propTypes = {
  file: PropTypes.object,
  onDelete: PropTypes.func,
};
export default AttachmentReviewer;
