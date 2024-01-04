import Spacer from "components/Common/Spacing";
import React from "react";
import { Button } from ".";

function Share() {
  return (
    <React.Fragment>
      <Button>
        <div className="d-flex">
          <i
            className="bx bx-user"
            style={{
              fontSize: "20px",
              marginRight: "10px",
            }}
          ></i>
          <p style={{ marginBottom: 0 }}>Share With</p>
        </div>
      </Button>
      <Spacer size={10} />
      <p
        style={{
          color: "red",
          paddingLeft: "0.6rem",
        }}
      >
        To be update
      </p>
    </React.Fragment>
  );
}

export default Share;
