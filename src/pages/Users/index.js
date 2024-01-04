import React from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CardShortcut from "components/Common/CardShortcut";
import { DATA_YOUR_SHORTCUTS, DATABOXTAGS } from "constants/dataUsers";
import CardReportsMasters from "components/Common/CardReportsMasters";
import { MetaTags } from "react-meta-tags";

export default function Hr() {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Users</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="VVS" breadcrumbItem="Users" />
          <CardShortcut
            dataShortcut={DATA_YOUR_SHORTCUTS}
            title="Your Shortcuts"
          />
          <CardReportsMasters
            title="Reports & Masters"
            dataProject={DATABOXTAGS}
          ></CardReportsMasters>
        </Container>
      </div>
    </React.Fragment>
  );
}
