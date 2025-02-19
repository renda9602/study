import { useCallback, useReducer, useRef } from "react";
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
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map(item =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter(item => item.id !== action.targetId);
    case "UPDATE_ALL":
      return state.map(item => ({
        ...item,
        isDone: action.isAllCompleted,
      }));
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mocData);
  const idRef = useRef(3);

  // <인풋에 입력된 내용을 보내는 방법
  const onCreate = content => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };
  // 인풋에 입력된 내용을 보내는 방법>

  // 모든 항목이 선택되었는지 확인
  const isAllCompleted = todos.length > 0 && todos.every(todo => todo.isDone);

  // 전체 선택/해제 함수
  const onUpdateAll = () => {
    dispatch({
      type: "UPDATE_ALL",
      isAllCompleted: !isAllCompleted,
    });
  };

  // <체크박스 선택 해제 보내는 방법
  const onUpdate = useCallback(targetId => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);
  // 체크박스 선택 해제 보내는 방법>

  // <삭제하기 버튼 설정 방법
  const onDelete = useCallback(targetId => {
    // 인수 : totos 배열에서 targetId 와 일치하는 id를 갖는 요소만!! 삭제하는 새로운 배열이 필요.
    // alert("삭제할까요?");
    if (window.confirm("삭제할까요?"))
      dispatch({
        type: "DELETE",
        targetId: targetId,
      });
  }, []);
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
