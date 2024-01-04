import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import uploadImg from "assets/images/upload-img.svg";
import cameraOff from "assets/images/camera-off.svg";
import { CommonButton } from "./ButtonCommon";

const UploadImage = ({ onUploaded, imgFile, disabled, readOnly }) => {
  const [image, setImage] = useState(null);
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleUploadFile = async e => {
    if (!e.target.files.length) return;
    const file = e.target.files[0];

    Object.assign(file, {
      preview: URL.createObjectURL(file),
      formattedSize: formatBytes(file.size),
    });

    setImage(file);
    onUploaded(file);
  };

  const handleDeleteImage = () => {
    if (disabled || readOnly) return;
    onUploaded({ ...imgFile, isRemove: true });
    setImage(null);
  };

  useEffect(() => {
    if (imgFile?.isRemove) return setImage(null);
    setImage(imgFile);
  }, [imgFile]);

  return (
    <React.Fragment>
      <div className="position-relative">
        <img
          src={
            image?.preview || image?.url || (disabled ? cameraOff : uploadImg)
          }
          className="rounded w-100 cursor-pointer"
          style={{
            ...((image?.preview || image?.url) && {
              aspectRatio: "1 / 1",
            }),
          }}
        />

        {!readOnly && (
          <input
            type="file"
            className="upload-input"
            onChange={handleUploadFile}
            disabled={disabled}
            readOnly={readOnly}
          />
        )}

        {(image?.preview || image?.url) && !disabled && !readOnly ? (
          <CommonButton
            level={2}
            className="delete-image-button"
            onClick={handleDeleteImage}
            type="button"
          >
            <i className="fas fa-trash" />
          </CommonButton>
        ) : null}
      </div>
    </React.Fragment>
  );
};
UploadImage.propTypes = {
  imgFile: PropTypes.object,
  onUploaded: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
};
export default UploadImage;
