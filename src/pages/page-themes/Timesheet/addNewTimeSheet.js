import CardCustom from "components/Common/CardCollapse";
import Spacing from "components/Common/Spacing";
import SubHeaderProject from "components/Common/SubHeaderProjects";
import BillingDetails from "components/Projects/CardCollapse/BillingDetails";
import Notes from "components/Projects/CardCollapse/Notes";
import React from "react";
import { Card, Container, Input, Label, Row } from "reactstrap";

AddNewTimeSheet.propTypes = {};

function AddNewTimeSheet(props) {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <SubHeaderProject />
          <Card body>
            <Row>
              <div className="col-6">
                <Label className="label_modal">Series</Label>
                <select className="form-select">
                  <option>TS-YYYY-</option>
                </select>
                <Spacing size={10}></Spacing>

                <Label className="label_modal">Company</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                />
                <Spacing size={10}></Spacing>

                <Label className="label_modal">Customer</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                />
                <Spacing size={10}></Spacing>

                <Label className="label_modal">Currency</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                />
                <Spacing size={10}></Spacing>

                <Label className="label_modal">Exchange Rate</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                />
                <Spacing size={10}></Spacing>
              </div>
              <div className="col-6">
                <Label className="label_modal">Status</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                  disabled
                  value="Draft"
                />
                <Spacing size={10}></Spacing>
                <Label className="label_modal">Project</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                />
                <Spacing size={10}></Spacing>
              </div>
            </Row>
          </Card>
          <Card body>
            <Row>
              <h5>Employee Detail</h5>
              <div className="col-6">
                <Label className="label_modal">Employee</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                />
                <Spacing size={10}></Spacing>
              </div>
            </Row>
          </Card>
          <Card body>
            <Row>
              <div className="col-6">
                <Label className="label_modal">Total Working Hours</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="formrow-firstname-Input"
                  value={0}
                />
                <Spacing size={10}></Spacing>
              </div>
            </Row>
          </Card>
          <CardCustom title="Billing Details " element={<BillingDetails />} />
          <Card body>
            <Notes />
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default AddNewTimeSheet;
