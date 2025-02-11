import './App.css';
import { useState, useRef } from 'react';
import Editer from './Components/Editor';
import Header from './Components/Header';
import List from './Components/List';

// 임시데이터
const mocDate = [
  {
    id : 0,
    isDone: false,
    content: "React 공부하기",
    date : new Date().getTime(),
  },
  {
    id : 1,
    isDone: false,
    content: "빨래하기",
    date : new Date().getTime(),
  },
  {
    id : 2,
    isDone: false,
    content: "노래 연습하기",
    date : new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mocDate);
  const idRef = useRef(3);

  // App 안에서 뿌려줄 데이터를 새로 생성한다.
  const onCreat = (content) => {
    const newTodo = {
      id: idRef.current++, //id값을 증가하도록 한다.
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  }

  return (
    <div className="App">
      <Header />
      <Editer onCreat={onCreat} />
      <List todos={todos} />
    </div>
  )
}

export default App
