import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useState } from "react";

export const CommonTabsSwitch = styled.div`
  border-radius: 37px;
  background-color: #ebecf0;
  padding: ${props =>
    props.height && props.padding ? `${props.padding}px` : "8px"};
  width: 100%;
  height: ${props =>
    props.height && props.padding ? `${props.height}px` : "38px"};
  margin-left: auto;
  margin-right: auto;

  .tabs-switch {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;

    :after {
      content: "";
      position: absolute;
      width: ${props =>
        props.tabLength ? `${100 / props.tabLength}%` : "50%"};
      top: 0;
      transition: left cubic-bezier(0.88, -0.35, 0.565, 1.35) 0.4s;
      border-radius: 27.5px;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
      background-color: #3d90ef;
      height: ${props =>
        props.height && props.padding
          ? `${props.height - props.padding * 2}px`
          : "22px"};
      z-index: 0;
    }
    .tab {
      display: inline-block;
      width: ${props =>
        props.tabLength ? `${100 / props.tabLength}%` : "50%"};
      z-index: 1;
      position: relative;
      cursor: pointer;
      transition: color 200ms;
      font-size: 14px;
      font-weight: 500;
      line-height: normal;
      user-select: none;
      color: #3d90ef;
    }
    .active {
      color: #ffffff;
    }
  }
  .left:after {
    left: ${props =>
      props.positionActiveKey ? `${props.positionActiveKey}%` : "0"};
  }
`;

export const TabsSwitch = ({ tabList, onChange, defaultActiveKey, style }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const [positionActiveKey, setPositionActiveKey] = useState(0);

  const onChangeKey = (key, event) => {
    event.stopPropagation();
    onChange?.(key);
    setActiveKey(key);
    calculatePosition(key);
  };

  const calculatePosition = activeKey => {
    if (!tabList || !tabList?.length) return;

    const widthElement = 100 / tabList?.length;

    setPositionActiveKey(widthElement * activeKey);
  };

  return (
    <React.Fragment>
      <CommonTabsSwitch
        positionActiveKey={positionActiveKey}
        tabLength={tabList?.length}
        {...style}
      >
        <div className="tabs-switch left text-center">
          {tabList?.length > 0 &&
            tabList?.map((tab, index) => (
              <div
                key={index}
                className={`tab ${tab?.key === activeKey && "active"}`}
                onClick={event => onChangeKey(tab?.key, event)}
              >
                {tab?.title}
              </div>
            ))}
        </div>
      </CommonTabsSwitch>
    </React.Fragment>
  );
};

TabsSwitch.propTypes = {
  onChange: PropTypes.func,
  tabList: PropTypes.array.isRequired,
  defaultActiveKey: PropTypes.number,
  style: PropTypes.object,
};
TabsSwitch.defaultProps = {
  tabList: [],
  onChange: () => {},
  defaultActiveKey: 1,
  style: {},
};
