import React from "react";
import PropTypes from "prop-types";
import Tags from "./Tags";

export default function BoxTags(props) {
  const { dataBoxtags } = props;
  return (
    <React.Fragment>
      {dataBoxtags &&
        dataBoxtags.map((item, id) => (
          <div key={"item" + id}>
            <p>{item.title}</p>
            <Tags itemTags={item.BoxTags} />
          </div>
        ))}
    </React.Fragment>
  );
}

BoxTags.propTypes = {
  title: PropTypes.string,
  dataBoxtags: PropTypes.any,
};
