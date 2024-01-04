import React from "react";
import { MENU } from "./constants/menu";
import { Tabs } from "components/Common/Tabs";

export default function Administrators() {
  const activeTab = sessionStorage.getItem("ADMINISTRATORS_ACTIVE_TAB");
  const handleOnChangeTab = key => {
    sessionStorage.setItem("ADMINISTRATORS_ACTIVE_TAB", key);
  };

  return (
    <div className="page-content">
      <Tabs
        menuList={MENU()}
        onChange={handleOnChangeTab}
        defaultActiveKey={+activeTab || 1}
      />
    </div>
  );
}
