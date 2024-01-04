import React, { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import SubHeaderProject from "../../../components/Common/SubHeaderProjects.js";
import VVSSelect from "components/form-control/VVSSelect";
import VVSTree from "components/Common/VVSTree";
import { useForm } from "react-hook-form";
import Spacer from "components/Common/Spacing";

export default function Departments() {
  const [companySelected, setCompanySelected] = useState({});
  const { register, setValue, setError, clearErrors } = useForm();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <SubHeaderProject />
          <Card body>
            <Row>
              <Col sm={6}>
                <VVSSelect
                  label="Company"
                  name="company"
                  register={register}
                  clearErrors={clearErrors}
                  setValue={setValue}
                  setError={setError}
                  model="Company"
                  searchField="name"
                  fieldView={["name"]}
                  onSelect={setCompanySelected}
                />
              </Col>
              {companySelected?.name && (
                <VVSTree
                  modelName="Department"
                  include={["company"]}
                  company={companySelected}
                  conditionField={{
                    company: {
                      __type: "Pointer",
                      className: "Company",
                      objectId: companySelected?.objectId,
                    },
                    nodeParent: {
                      $exists: false,
                    },
                  }}
                />
              )}
            </Row>
          </Card>
          <Spacer size={120} />
        </Container>
      </div>
    </React.Fragment>
  );
}
