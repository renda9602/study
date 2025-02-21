import { useContext, useRef, useState } from "react";
import { TodoDispatchContext } from "../App";
import "./Editor.css";

const Editor = () => {
  const { onCreate } = useContext(TodoDispatchContext);

  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChangeContent = e => {
    setContent(e.target.value);
  };

  const onKeydown = e => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content === "") {
      // content 가 비었을때 포커스가 되도로 해
      inputRef.current.focus();
      return;
    }

    onCreate(content); // content 를 입력하면, 호출해
    setContent(""); //초기화 해
  };

  return (
    <div className="Editor">
      <input
        ref={inputRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeydown}
        placeholder="새로운todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
