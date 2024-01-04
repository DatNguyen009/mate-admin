import AvatarCommon from "components/Common/AvatarCommon";
import Spacer from "components/Common/Spacing";
import ModalAssignment from "components/Modal/ModalAssignment";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from ".";
import useReuseData from "custom-hook/useReuseData";
import { fetchUsers } from "redux-toolkit/slices/Users/userSlice";
import TooltipCommon from "components/Common/TooltipCommon";
import { v4 as uuid_v4 } from "uuid";

function Assignments({ assignees, onChange }) {
  const { users } = useReuseData(fetchUsers, "User");
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setIsOpenModal(true);
        }}
      >
        <div className="d-flex">
          <i
            className="bx bx-user-plus"
            style={{
              fontSize: "20px",
              marginRight: "10px",
            }}
          ></i>
          <p style={{ marginBottom: 0 }}>Assigned To</p>
        </div>
      </Button>
      <Spacer size={10} />
      <div className="d-flex justify-content-start">
        <Spacer size={10} />
        {assignees?.map((assignee, index) => {
          const id = "tooltip-" + uuid_v4();
          return (
            <React.Fragment key={`key-${index}`}>
              <AvatarCommon
                id={id}
                className="circle-avatar-hover"
                style={{ margin: 0, marginLeft: -10 }}
                config={{ size: 32, borderWidth: 2, circle: true }}
                src="https://picsum.photos/200/300"
              />
              <TooltipCommon target={id} content={assignee.username} />
            </React.Fragment>
          );
        })}
      </div>

      <ModalAssignment
        isOpenModal={isOpenModal}
        onCloseModal={() => {
          setIsOpenModal(false);
        }}
        onChange={onChange}
        users={users}
        assignees={assignees}
      />
    </React.Fragment>
  );
}

Assignments.propTypes = {
  assignees: PropTypes.array,
  onChange: PropTypes.func,
};

export default Assignments;
