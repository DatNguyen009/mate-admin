import PropTypes from "prop-types";
import { Tabs as ITabs } from "antd";
import styled from "styled-components";
import React, { useState } from "react";

export const CommonTabs = styled(ITabs)`
  & .ant-tabs-nav-list {
    .ant-tabs-tab {
      border: 0;
      display: flex;
      font-size: 13px;
      justify-content: center;
      background-color: transparent;

      &:hover,
      &:focus {
        color: #343a40;
      }
      .ant-tabs-tab-btn:active {
        color: #343a40;
      }
    }
    .ant-tabs-tab-active {
      display: flex;
      justify-content: center;
      background-color: #2a3042;
      border-radius: 12px 12px 0px 0px !important;

      .ant-tabs-tab-btn {
        color: #ffff;
      }
    }
  }

  & .ant-tabs-content {
    .page-content {
      padding: 5px;
    }
  }
`;

export const Tabs = ({ menuList, onChange, defaultActiveKey }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey);

  const onChangeKey = key => {
    onChange?.(key);
    setActiveKey(key);
  };

  return (
    <CommonTabs
      type="card"
      items={menuList}
      activeKey={activeKey}
      onChange={onChangeKey}
    />
  );
};

Tabs.propTypes = {
  onChange: PropTypes.func,
  menuList: PropTypes.array,
  defaultActiveKey: PropTypes.number,
};
Tabs.defaultProps = {
  menuList: [],
  onChange: () => {},
  defaultActiveKey: 1,
};
