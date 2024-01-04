import React from "react";

import CardCollapse from "components/Common/CardCollapse";
import { CommonButton } from "components/Common/ButtonCommon";

const ApiAccessCard = () => {
  return (
    <CardCollapse
      title="Api Access"
      element={
        <CommonButton level={1} type="button">
          Generate Keys
        </CommonButton>
      }
    />
  );
};

export default ApiAccessCard;
