import React from "react";
import PropTypes from "prop-types";
import ZaloIcon from "assets/images/icons/zalo";
import { CommonMediaButton } from "./styles";

function MediaButton({ handleClick, icons, background, isloading }) {
  return (
    <CommonMediaButton
      type="button"
      className="btn"
      style={{
        background:
          icons === "facebook"
            ? "rgb(54, 127, 247)"
            : icons === "zalo"
            ? "rgb(43, 105, 246)"
            : background,
        height: "38px",
      }}
      onClick={handleClick}
    >
      {icons === "facebook" ? (
        <>
          <i
            className={`
          " bx bxl-messenger font-size-16`}
          />
        </>
      ) : icons === "zalo" ? (
        <>
          <ZaloIcon size={16} />
        </>
      ) : (
        <>{icons}</>
      )}
    </CommonMediaButton>
  );
}

MediaButton.propTypes = {
  icons: PropTypes.any,
  isloading: PropTypes.bool,
  handleClick: PropTypes.func,
  background: PropTypes.string,
};

export default MediaButton;
