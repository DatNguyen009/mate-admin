import React from "react";
import PropTypes from "prop-types";

export default function Tags(props) {
  const { itemTags } = props;
  return (
    <React.Fragment>
      {itemTags &&
        itemTags.map((item, index) => (
          <div key={"item" + index} className="itemTags">
            <div className="badge bg-light itemTags__icon">
              <i className="bx bx-plus"></i>
            </div>
            <div className="badge bg-light text-center">
              <div className="d-flex itemTags__detail">
                {item.countEmployee.length !== 0 && (
                  <p className="itemTags__detail--count">
                    {item.countEmployee.length}
                  </p>
                )}
                <p className="itemTags__detail--title">{item.itemBoxTag}</p>
              </div>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
}
Tags.propTypes = {
  itemTags: PropTypes.any,
};
