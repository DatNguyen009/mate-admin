import React from "react";
import PropTypes from "prop-types";

export default function Tags(props) {
  const { itemTags } = props;
  return (
    <React.Fragment>
      {itemTags?.map((item, index) => (
        <div key={"item" + index} style={{ margin: "10px 0" }}>
          <div
            className="badge bg-light text-center"
            style={{ marginRight: "10px" }}
          >
            <p style={{ margin: "0.4rem 0.4rem" }}>{item.item}</p>
          </div>
          <div className="badge bg-light ">
            <i className="bx bx-plus" style={{ margin: "0.4rem 0.4rem" }}></i>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
Tags.propTypes = {
  itemTags: PropTypes.any,
};
