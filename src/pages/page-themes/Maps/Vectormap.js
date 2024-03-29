import React, { Component } from "react";
import PropTypes from "prop-types";
import { VectorMap } from "react-jvectormap";
import "./jquery-jvectormap.scss";

export class Vectormap extends Component {
  render() {
    const map = React.createRef(null);
    return (
      <div style={{ width: this.props.width, height: 500 }}>
        <VectorMap
          map={this.props.value}
          backgroundColor="transparent"
          ref={map}
          containerStyle={{
            width: "100%",
            height: "80%",
          }}
          regionStyle={{
            initial: {
              fill: this.props.color,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer",
            },
            selected: {
              fill: "#2938bc", //what colour clicked country will be
            },
            selectedHover: {},
          }}
          containerClassName="map"
        />
      </div>
    );
  }
}

Vectormap.propTypes = {
  color: PropTypes.string,
  value: PropTypes.any,
  width: PropTypes.string,
};

export default Vectormap;
