import "./editor.css";
import { useState, useRef } from "react";

const Editer = ({onCreat}) => {

    const [content, setContent] = useState("");
    const contentRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const onKeydown = (e) => {
        if(e.keyCode === 13) {
            onSubmit();
        }
    };

    const onSubmit = () => {
        if(content === "") { // content 가 비었을때 포커스가 되도로 해
            contentRef.current.focus();
            return;
        };

        onCreat(content); // content 를 입력하면, 호출해
        setContent(""); //초기화 해
    };

    return (
        <div className="editor">
            <input
            ref={contentRef}
            value={content}
            onKeyDown={onKeydown}
            onChange={onChangeContent}
            placeholder="새로운todo..." />
            <button onClick={onSubmit}>추가</button>
        </div>
    )
}

export default Editer;
