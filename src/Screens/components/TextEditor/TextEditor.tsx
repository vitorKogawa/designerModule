import React, { ChangeEvent, useState } from "react";
import { EditorState } from "draft-js";
import { Editor, RawDraftContentState } from 'react-draft-wysiwyg';
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles/style.scss"

interface ITextEditor {
  onChangeDescription: Function
}

const MyEditor: React.FC<ITextEditor> = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onContentChange = (event: RawDraftContentState) => props.onChangeDescription(event)
  

  return <Editor 
    editorState={editorState} 
    onEditorStateChange={setEditorState}
    toolbar={{
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
    }}
    onChange={(event) => onContentChange(event)}
    placeholder="Adicione uma descrição para o jogo :)."
    />;
};

export { MyEditor };
