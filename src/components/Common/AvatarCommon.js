import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function AvatarCommon({ id, config, src, alt, style, className }) {
  const { circle, size, borderWidth, borderColor = "#ececec" } = config;

  return (
    <div
      id={id}
      style={{
        width: size,
        height: size,
        padding: borderWidth,
        backgroundColor: borderColor,
        ...style,
      }}
      className={classNames(
        "d-flex justify-content-center align-items-center",
        circle && "rounded-circle",
        className
      )}
    >
      <img
        className={classNames("w-100 h-100", circle && "rounded-circle")}
        src={src}
        alt={alt || ""}
      />
    </div>
  );
}

AvatarCommon.propTypes = {
  config: PropTypes.shape({
    circle: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    borderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    borderColor: PropTypes.string,
  }),
  style: PropTypes.object,
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.string,
};

export default AvatarCommon;
