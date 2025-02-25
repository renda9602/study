import "./App.css";
// 라우팅 설정
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import New from "./pages/New";
import Notfound from "./pages/NotFound";
import { getEmotionImg } from "./utill/get-emotion-image";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 추가하는  New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
  const nav = useNavigate();
  // 페이지 이동 함수
  const onClickButton = () => {
    // 페이지 이동
    nav("/new");
  };

  return (
    <>
      {/* import를 통해서 이미지의 경로를 불러오는 방식은 vite가 이미지 최적화한다  */}
      <div>
        <img src={getEmotionImg(1)} />
        <img src={getEmotionImg(2)} />
        <img src={getEmotionImg(3)} />
        <img src={getEmotionImg(4)} />
        <img src={getEmotionImg(5)} />
      </div>

      {/* 내부링크는 a 태그보다 Link 태그를 사용한다. */}
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/niary"}>Diary</Link>
      </div>
      <button onClick={onClickButton}>New 페이지로 이동 </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
