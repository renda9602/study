import { useRef, useState } from "react";
import "./App.css";
import Editor from "./commonents/Editor";
import Header from "./commonents/Header";
import List from "./commonents/List";

//임시데이터
const mocData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래연습하기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mocData);
  const idRef = useRef(3);

  // <인풋에 입력된 내용을 보내는 방법
  const onCreate = content => {
    const newTodo = {
      // 고유 id 를 생성하기 위해 useRef 를 선언하고
      // 새로운 idRef 를 만들어서, 입력할때 생성되는 id 에 부과한다.
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]); // 헷갈려.. 배열의 앞뒤 순서를 바꿔도 적용된다.
  };
  // 인풋에 입력된 내용을 보내는 방법>

  // 모든 항목이 선택되었는지 확인
  const isAllCompleted = todos.length > 0 && todos.every(todo => todo.isDone);

  // 전체 선택/해제 함수
  const onUpdateAll = () => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        isDone: !isAllCompleted, // 현재 상태의 반대로 모든 항목 변경
      }))
    );
  };

  // <체크박스 선택 해제 보내는 방법
  const onUpdate = targetId => {
    // - todos state 값들중에 targetId 과 일치된느 아이템의 isDone 변경
    // - 인수: todos 배열에서 targetId 의 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열이 필요
    setTodos(
      todos.map(todo =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  // 체크박스 선택 해제 보내는 방법>

  // <삭제하기 버튼 설정 방법
  const onDelete = targetId => {
    // 인수 : totos 배열에서 targetId 와 일치하는 id를 갖는 요소만!! 삭제하는 새로운 배열이 필요.
    // alert("삭제할까요?");
    if (confirm("삭제할까요?") === true) {
      document.removefrm.submit();
    } else {
      return false;
    }

    setTodos(todos.filter(todo => todo.id !== targetId));
  };
  // 삭제하기 버튼 설정 방법>

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List
        todos={todos}
        onUpdate={onUpdate}
        onUpdateAll={onUpdateAll}
        isAllCompleted={isAllCompleted}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
