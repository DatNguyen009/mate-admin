import React, { useEffect, useState } from "react";
import { Col, Label, Row } from "reactstrap";
import PropTypes from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function ContainerPersonalBio(props) {
  const { onChangeTextEditor, content } = props;
  const contentBlock = htmlToDraft(content || "");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!contentBlock) {
      return;
    }
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }, []);

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
          <Label className="form-label">Bio / Cover Letter</Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

ContainerPersonalBio.propTypes = {
  onChangeTextEditor: PropTypes.func,
  content: PropTypes.any,
};
