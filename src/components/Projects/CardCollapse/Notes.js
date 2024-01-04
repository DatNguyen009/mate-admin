import React, { useEffect, useState } from "react";
import { Col, Label, Row } from "reactstrap";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Notes(props) {
  const { onChangeTextEditor, content, label, toolbar = {} } = props;
  const contentBlock = htmlToDraft(content || "");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(contentBlock)
    )
  );

  useEffect(() => {
    if (content) {
      setEditorState(() =>
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(content || ""))
        )
      );
    }
  }, [content]);

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
    onChangeTextEditor(prev =>
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Label className="form-label">{label}</Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            editorStyle={{ height: "500px" }}
            toolbar={toolbar}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

Notes.propTypes = {
  label: PropTypes.any,
  toolbar: PropTypes.object,
  onChangeTextEditor: PropTypes.func,
  content: PropTypes.any,
};
