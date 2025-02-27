import "./App.css";

// 라우팅 설정
import { createContext, useReducer, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";
import Notfound from "./pages/NotFound";

//Header
//button
//Edit

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 추가하는  New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

//임시데이터
const mockData = [
  {
    id: 1, // 일기 고유 아이디
    createdDate: new Date("2025-02-27").getTime(), // 작성 시간
    emotionId: 1, // 감정 아이디
    content: "오늘의 일기 1번", // 일기 내용
  },
  {
    id: 2,
    createdDate: new Date("2025-02-26").getTime(),
    emotionId: 2,
    content: "오늘의 일기 2번",
  },
  {
    id: 3,
    createdDate: new Date("2025-01-11").getTime(),
    emotionId: 3,
    content: "오늘의 일기 3번",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map(item =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter(item => String(item.id) !== String(action.data));
    default:
      return state;
  }
}

// context 생성
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4); // 새로운 ID추가를 위해 useRef 를 생성

  //
  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++, // 새로운 ID추가
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = id => {
    dispatch({
      type: "DELETE",
      data: id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUdate,
            onDelete,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
