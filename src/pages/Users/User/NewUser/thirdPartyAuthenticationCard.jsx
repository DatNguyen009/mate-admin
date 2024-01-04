import React from "react";
import PropTypes from "prop-types";

import { CommonLabel } from "components/Common/inputCommon";
import CardCollapse from "components/Common/CardCollapse";
import TableCommon from "components/Common/TableCommon";

const ThirdPartyAuthenticationCard = props => {
  const { socialLogins, DATA_TABLE_COMMON, setSocialLogins, id } = props;

  return (
    <CardCollapse
      title="Third Party Authentication"
      element={
        <>
          <CommonLabel>Social Logins</CommonLabel>
          <TableCommon
            dataTableCommon={socialLogins || []}
            columns={DATA_TABLE_COMMON.socialLogins}
            onHandleChangeTable={setSocialLogins}
            disableAddRow={Boolean(id)}
          />
        </>
      }
    />
  );
};

ThirdPartyAuthenticationCard.propTypes = {
  socialLogins: PropTypes.array,
  setSocialLogins: PropTypes.func,
  DATA_TABLE_COMMON: PropTypes.object,
  id: PropTypes.string,
};

export default ThirdPartyAuthenticationCard;
