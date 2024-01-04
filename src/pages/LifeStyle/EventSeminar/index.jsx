import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import VVSTable from "components/form-control/VVSTable";
import VVSSelectModel from "components/form-control/VVSSelectModel";
import { useForm } from "react-hook-form";
import VVSSelect from "components/form-control/VVSSelect";

const EventSeminar = () => {
  const [categorySelected, setCategorySelected] = useState("");
  const { handleSubmit, ...rest } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (categorySelected) {
      getFilterLead(categorySelected);
    }
  }, [categorySelected]);

  const getFilterLead = categoryId => {
    return { ...(categoryId && { categoryId: categoryId }) };
  };

  useEffect(() => {
    const categoryId = rest.watch("categoryId");
    if (!categoryId) {
      getFilterLead(categoryId);
    }
  }, [rest.watch(["categoryId"])]);

  return (
    <div className="page-content">
      <Container fluid>
        <form>
          <Row
            style={{
              position: "relative",
              marginBottom: "-35px",
              zIndex: 99,
              width: "max-content",
            }}
          >
            <h4 className="my-0 font-size-18 text-capitalize mb-2">
              Quản lý sự kiện hội thảo
            </h4>

            <Row>
              <Col sm={6} className="mt-4">
                <VVSSelect
                  label="Loại hội thảo / sự kiện"
                  name="categoryId"
                  model="Category"
                  {...rest}
                  searchField="subject"
                  fieldView={["subject"]}
                  conditionField={{ type: "job" }}
                  onSelect={item => setCategorySelected(item?.categoryId)}
                />
              </Col>
            </Row>
          </Row>
        </form>

        <VVSTable
          name="Seminar"
          disableDelete={true}
          disableAdd
          whereQuery={{
            ...(rest.getValues("categoryId") &&
              getFilterLead(categorySelected)),
          }}
        />
      </Container>
    </div>
  );
};

export default EventSeminar;
