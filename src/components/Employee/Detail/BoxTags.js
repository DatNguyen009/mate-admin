import React from "react";
import PropTypes from "prop-types";
import Tags from "./Tags";

export default function ItemConnection(props) {
  const { dataBoxtags } = props;
  return (
    <React.Fragment>
      {dataBoxtags?.map((item, id) => (
        <div style={{ marginRight: "2rem", marginBottom: "2rem" }} key={""}>
          <p>{item.title}</p>
          <Tags itemTags={item.BoxTags} />
        </div>
      ))}
    </React.Fragment>
  );
}

ItemConnection.propTypes = {
  title: PropTypes.string,
  dataBoxtags: PropTypes.any,
};
