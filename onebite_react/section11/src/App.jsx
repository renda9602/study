import './App.css';
// 컨텍스트 생성
import { createContext, useReducer, useRef } from 'react';
// 라우팅 설정
import { Route, Routes } from 'react-router-dom';
// 페이지 컴포넌트
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';
import New from './pages/New';
import Notfound from './pages/NotFound';

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
    createdDate: new Date('2025-03-27').getTime(), // 작성 시간
    emotionId: 1, // 감정 아이디
    content: '오늘의 일기 1번', // 일기 내용
  },
  {
    id: 2,
    createdDate: new Date('2025-03-26').getTime(),
    emotionId: 2,
    content: '오늘의 일기 2번',
  },
  {
    id: 3,
    createdDate: new Date('2025-02-11').getTime(),
    emotionId: 3,
    content: '오늘의 일기 3번',
  },
];

// 리듀서 함수 정의 (리듀서 함수는 상태와 액션을 받아 새로운 상태를 반환)
function reducer(state, action) {
  // 액션 타입에 따라 상태 업데이트
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map(item =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case 'DELETE':
      return state.filter(item => String(item.id) !== String(action.data));
    default:
      return state;
  }
}

// context 생성
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // 일기 데이터 관리
  const [data, dispatch] = useReducer(reducer, mockData);
  // 새로운 ID추가를 위해 useRef 를 생성
  const idRef = useRef(4);
  //
  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    //  새로운 일기 데이터 생성
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++, // 새로운 ID추가
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    // 수정할 데이터 생성
    dispatch({
      type: 'UPDATE',
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
    // 삭제할 데이터 생성
    dispatch({
      type: 'DELETE',
      data: id,
    });
  };

  return (
    <>
      {/* // 데이터 전달 */}
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          {/* // 라우트 설정 및 컴포넌트 연결  */}
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
