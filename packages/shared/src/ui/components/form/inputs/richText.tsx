import { useField } from "formik";
import React, { useRef } from "react";

import { InputProps } from "..";
import { commonInputClasses } from "../../../../utils/consts";

type FinalInput = InputProps & React.TextareaHTMLAttributes<HTMLDivElement>;

const RichTextInput: React.FC<FinalInput> = ({ name, placeholder }) => {
  const [field, , helpers] = useField<string>(name);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const applyCommand = (command: "bold" | "italic" | "underline" | "insertUnorderedList") => {
    editorRef.current?.focus();
    document.execCommand(command);
    helpers.setValue(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="w-100">
      <div className="btn-group btn-group-sm mb-2" role="group">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => applyCommand("bold")}
        >
          B
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => applyCommand("italic")}
        >
          I
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => applyCommand("underline")}
        >
          U
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => applyCommand("insertUnorderedList")}
        >
          •
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={`form-control form-control-sm ${commonInputClasses}`}
        style={{ minHeight: "140px" }}
        data-placeholder={placeholder || ""}
        onInput={(event) => helpers.setValue((event.target as HTMLDivElement).innerHTML)}
        dangerouslySetInnerHTML={{ __html: field.value || "" }}
      />
    </div>
  );
};

export default RichTextInput;
