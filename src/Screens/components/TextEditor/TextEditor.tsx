import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles/style.scss"


const MyEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
    />;
};

export { MyEditor };
