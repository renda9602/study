import './App.css';
// 컨텍스트 생성
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
// 라우팅 설정
import { Route, Routes } from 'react-router-dom';
// 페이지 컴포넌트
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';
import New from './pages/New';
import Notfound from './pages/Notfound';

//Header
//button
//Edit

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 추가하는  New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

// 리듀서 함수 정의 (리듀서 함수는 상태와 액션을 받아 새로운 상태를 반환)
// 초기 상태와 액션을 받아 새로운 상태를 반환하는 함수
function reducer(state, action) {
  // 초기 상태 설정
  let nextState;

  // 액션 타입에 따라 상태 업데이트
  switch (action.type) {
    // 초기화 액션 처리 (로컬 스토리지에서 데이터를 가져와 상태를 초기화)
    // 로컬 스토리지에서 데이터 가져오기
    case 'INIT':
      return action.data;

    case 'CREATE': {
      // 새로운 데이터 생성
      nextState = [action.data, ...state];
      break;
    }
    case 'UPDATE': {
      // 기존 데이터 업데이트
      nextState = state.map(item =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case 'DELETE': {
      // 데이터 삭제
      nextState = state.filter(item => String(item.id) !== String(action.data));
      break;
    }
    default:
      return state;
  }
  // 상태 업데이트 후 로컬 스토리지에 저장 (로컬 스토리지에 저장된 데이터는 브라우저를 닫아도 유지)
  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}

// context 생성
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // 일기 데이터 관리
  const [data, dispatch] = useReducer(reducer, []);
  // 새로운 ID추가를 위해 useRef 를 생성
  const idRef = useRef(0);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    // 로컬 스토리지에서 데이터 가져오기
    const storedData = localStorage.getItem('diary');
    if (!storedData) {
      // 데이터가 없으면 빈 배열 반환
      setIsLoading(false);
      return;
    }
    // 데이터가 없으면 빈 배열 반환
    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      // 데이터가 배열이 아니면 빈 배열 반환
      setIsLoading(false);
      return;
    }

    // 데이터가 배열이면 최대 ID 찾기
    let maxId = 0;

    parsedData.forEach(item => {
      if (item.id > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    // 초기화 액션 디스패치
    dispatch({
      type: 'INIT',
      data: parsedData,
    });
    // 로딩 상태 변경 (로딩 완료)
    setIsLoading(false);
  }, []);
  // 데이터가 있으면 JSON 형식으로 파싱하여 데이터 가져오기

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

  if (isLoading) {
    return <div>데이터 로딩중...</div>;
  }

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
