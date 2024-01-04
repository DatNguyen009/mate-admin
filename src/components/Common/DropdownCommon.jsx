import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, DropdownItem, DropdownMenu } from "reactstrap";
import { CommonDropdownToggle } from "./inputCommon";
import Spacer from "./Spacing";
import { CommonText } from "./TextCommon";

function DropdownCommon({ defaultItem = "", items = [], onChange }) {
  const [toggleListView, settoggleListView] = useState();
  const [selectedItem, setSelectedItem] = useState(defaultItem);

  useEffect(() => {
    setSelectedItem(defaultItem);
  }, [defaultItem]);

  const handleItemClicked = item => {
    setSelectedItem(item);
    onChange(item);
  };

  return (
    <Dropdown
      isOpen={toggleListView}
      toggle={() => settoggleListView(prev => !prev)}
    >
      <CommonDropdownToggle
        caret
        style={{ marginLeft: 0 }}
        className="d-flex align-items-center btn btn-outline-light"
        tag="button"
        type="button"
      >
        <i className="bx bx-list-ol"></i>
        <Spacer size={20} />
        <CommonText mt={0}>{selectedItem}</CommonText>
        <Spacer size={5} />
        <i className="mdi mdi-chevron-down"></i>
      </CommonDropdownToggle>
      <DropdownMenu>
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              handleItemClicked(item);
            }}
          >
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

DropdownCommon.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  defaultItem: PropTypes.string,
};

export default DropdownCommon;
