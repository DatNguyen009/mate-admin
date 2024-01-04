import React from "react";
import CardReportsMasters from "components/Common/CardReportsMasters";
import CardShortcut from "components/Common/CardShortcut";
import {
  DATABOXTAGS,
  DATA_YOUR_SHORTCUTS,
  DATA_CREATE_SETUP,
} from "constants/dataCRM";
import { MetaTags } from "react-meta-tags";
import { Container } from "reactstrap";
import CardCreateSetup from "components/Common/CardCreateSetup";
import { CommonText } from "components/Common/TextCommon";

const CRM = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>CRM</title>
        </MetaTags>
        <Container fluid>
          <CommonText level={2} className="pb-2">
            CRM
          </CommonText>
          <CardCreateSetup dataCreate={DATA_CREATE_SETUP} />
          <CardShortcut
            title="Your Shortcuts"
            dataShortcut={DATA_YOUR_SHORTCUTS}
          />
          <CardReportsMasters
            title="Reports & Masters"
            dataProject={DATABOXTAGS}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CRM;
