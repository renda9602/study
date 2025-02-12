import { useRef, useState } from "react";
import "./App.css";
import Editer from "./Components/Editor";
import Header from "./Components/Header";
import List from "./Components/List";

// 임시데이터
const mocDate = [
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
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mocDate);
  const idRef = useRef(3);

  // App 안에서 뿌려줄 데이터를 새로 생성한다.
  const onCreat = content => {
    const newTodo = {
      id: idRef.current++, //id값을 증가하도록 한다.
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };

  const onUpdate = targetId => {
    // 투두 State의 값들 중에
    // targetId의 일치하는 id를 갖는 투두 아이템의 isdDone 을 변경
    // 인수:  todos  배열에서 targeId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
    // setTodos(todos.map((todo) => {
    //   if(todo.id === targetId) {
    //     return {
    //       ...todo,
    //       isDon: !todo.isDone,
    //     }
    //   }

    //   return todo
    // }))
    setTodos(
      todos.map(todo =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onDelete = targetId => {
    setTodos(todos.filter(todo => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <Editer onCreat={onCreat} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
