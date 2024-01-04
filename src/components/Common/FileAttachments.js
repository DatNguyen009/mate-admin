import React from "react";
import PropTypes from "prop-types";
export default function FileAttachments({
  attachments,
  onChange,
  disableDelete,
}) {
  const handleDeleteClick = i => {
    attachments.splice(i, 1);
    onChange && onChange(attachments);
  };
  return (
    <div onClick={e => e.stopPropagation()}>
      {attachments?.map((attachment, i) => (
        <span key={i} className="me-3">
          <a
            href={attachment.url || attachment.preview}
            download
            target="_blank"
            rel="noreferrer"
          >
            <i className="dripicons-paperclip">
              {attachment.url
                ? attachment.name.slice(attachment.name.indexOf("_") + 1)
                : attachment.name}
            </i>
          </a>
          {(!disableDelete && (
            <i
              className="dripicons-cross ms-1"
              style={{ color: "red" }}
              onClick={() => handleDeleteClick(i)}
            />
          )) ||
            null}
        </span>
      ))}
    </div>
  );
}
FileAttachments.propTypes = {
  attachments: PropTypes.array,
  onChange: PropTypes.func,
  disableDelete: PropTypes.bool,
};
