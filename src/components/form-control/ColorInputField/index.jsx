import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CommonInputt } from "../../Common/inputCommon";
import { SketchPicker } from "react-color";
import { CommonText } from "../../Common/TextCommon";
import classNames from "classnames";

const getColorBoxStyles = color => ({
  backgroundColor: color,
  position: "absolute",
  height: 27,
  width: 27,
  top: 4,
  left: 6,
  zIndex: 1,
  borderRadius: 6,
});

function ColorInputField({
  label,
  name,
  required,
  errors,
  register,
  setValue,
  watch,
}) {
  const [color, setColor] = useState();
  const [isShowColorPicker, setIsShowColorPicker] = useState(false);
  const watchColor = watch(name, false);

  const handleColorChange = (color, e) => {
    e.preventDefault();
    setValue(name, color.hex);
  };

  useEffect(() => {
    setColor(watchColor);
  }, [watchColor]);

  return (
    <React.Fragment>
      <CommonText
        className={classNames("form-label", required && "star-red-required")}
      >
        {label}
      </CommonText>

      <div
        className="position-relative"
        onClick={() => {
          setIsShowColorPicker(true);
        }}
        onBlur={() => {
          setIsShowColorPicker(false);
        }}
      >
        <div style={getColorBoxStyles(color)} />

        <CommonInputt
          {...register(name, { required })}
          readOnly
          type="text"
          className="form-control"
          style={{
            paddingLeft: 38,
          }}
        />

        {isShowColorPicker ? (
          <SketchPicker
            color={color}
            width="240px"
            onChange={handleColorChange}
          />
        ) : null}
      </div>

      {errors && (
        <CommonText level={0} color={"red"} style={{ margin: 0 }}>
          {errors[name]?.message}
        </CommonText>
      )}
    </React.Fragment>
  );
}

ColorInputField.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.object,
  name: PropTypes.string,
  required: PropTypes.bool,
  register: PropTypes.func,
  setValue: PropTypes.func,
  watch: PropTypes.func,
};

export default ColorInputField;
