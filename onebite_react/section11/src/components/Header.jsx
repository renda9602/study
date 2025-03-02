import './Header.css';

// 헤더 컴포넌트
// 헤더 컴포넌트 속성 정의 (props)
// 왼쪽 자식 요소
// 중앙 자식 요소
// 오른쪽 자식 요소
const Header = ({ leftChild, title, rightChild }) => {
  // 헤더 컴포넌트 반환
  return (
    <header className="Header">
      <div className="Header__left">{leftChild}</div>
      <div className="Header__center">{title}</div>
      <div className="Header__right">{rightChild}</div>
    </header>
  );
};

export default Header;
