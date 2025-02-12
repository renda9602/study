import { useReducer, useRef } from "react";
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

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATA":
      return state.map(item =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter(item => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  const [todos, disPatch] = useReducer(reducer, mocDate);
  const idRef = useRef(3);

  const onCreat = content => {
    disPatch({
      type: "CREATE",
      date: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = targetId => {
    disPatch({
      type: "UPDATA",
      targetId: targetId,
    });
  };

  const onDelete = targetId => {
    disPatch({
      type: "DELETE",
      targetId: targetId,
    });
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
