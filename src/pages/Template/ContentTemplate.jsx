import ModalCommon from "components/Common/ModalCommon";
import React, { useState } from "react";
import { Container } from "reactstrap";
import { CommonTextarea } from "components/Common/inputCommon";
import { CommonButton } from "components/Common/ButtonCommon";
import Spacer from "components/Common/Spacing";
import { CommonText } from "components/Common/TextCommon";
import { useRef } from "react";
import { toastrCRUDSuccess, toastrError } from "components/Common/AlertToastr";
import { TEXT_CANCELED, TEXT_UPLOADED } from "helpers/name_helper";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import httpService from "services/httpService";

export default function ContentTemplate() {
  const [isOpenModal, setIspenModal] = useState(false);
  const [htmlRender, setHtmlRender] = useState(null);
  const [title, setTitle] = useState(null);
  const templateRef = useRef(null);
  const { id } = useParams();

  useEffect(async () => {
    try {
      const url = "/parse/classes/Template/" + id;
      const response = await httpService.get(url);
      setTitle(response.title);
      setHtmlRender(response.content);
      templateRef.current = response.content;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleRevert = () => {
    setHtmlRender(templateRef.current);
    toastrCRUDSuccess("Content template", TEXT_CANCELED);
  };

  const handleSave = () => {
    const url = "/parse/classes/Template/" + id;
    const updateTemplate = {
      content: htmlRender,
    };
    httpService
      .put(url, updateTemplate)
      .then(() => {
        toastrCRUDSuccess("Content template", TEXT_UPLOADED);
      })
      .catch(() => {
        toastrError();
      });
  };

  const bodyTemplate = htmlRender
    ? htmlRender.split("<body>")[1].split("</body>")[0]
    : "";

  return (
    <div className="page-content">
      <Container fluid>
        <div className="d-flex justify-content-end">
          <CommonButton level={2} onClick={() => handleRevert()}>
            Đặt lại
          </CommonButton>
          <div style={{ width: "12px" }} />
          <CommonButton level={0} onClick={() => handleSave()}>
            Lưu
          </CommonButton>
          <div style={{ width: "12px" }} />
          <CommonButton level={3} onClick={() => setIspenModal(true)}>
            Xem trước
          </CommonButton>
        </div>
        <CommonText level={10}>{title}</CommonText>
        <Spacer size={20} />
        <CommonTextarea
          style={{ width: "100%", height: "58vh", border: "2px solid black" }}
          value={htmlRender}
          onChange={e => setHtmlRender(e.target.value)}
        />
        <ModalCommon
          onClose={() => setIspenModal(false)}
          isShowModal={isOpenModal}
          modalTitle={title}
          size="xl"
        >
          <div dangerouslySetInnerHTML={{ __html: bodyTemplate }} />
        </ModalCommon>
      </Container>
    </div>
  );
}
