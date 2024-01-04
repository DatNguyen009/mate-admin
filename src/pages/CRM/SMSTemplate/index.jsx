import VVSTable from "components/form-control/VVSTable";
import React from "react";
import { Container } from "reactstrap";

export const SMSTemplate = () => {
  const notEqualTemplate = [
    "YMBKur4ejR",
    "TDpWSiG7Po",
    "HIegsWaDVe",
    "LkMW0a6edV",
    "ZuH1BRxoGO",
    "NjKBfazQGf",
    "dAvVhdj8Sm",
    "HzIIU40Xzj",
    "4hF0SPtgCI",
    "iAZqcur7Lu",
    "Xs1y1jWKl0",
    "uiDtDxhzV4",
    "7NmPEu4rtX",
  ];
  return (
    <div className="page-content">
      <Container fluid>
        <VVSTable
          name="SMSTemplate"
          title="Mẫu tin nhắn"
          whereQuery={{
            objectId: {
              $nin: notEqualTemplate,
            },
          }}
        />
      </Container>
    </div>
  );
};
