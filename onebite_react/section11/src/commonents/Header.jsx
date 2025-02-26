import "./Header.css";

const Header = ({ leftChild, title, rightChild }) => {
  return (
    <header className="Header">
      <div className="Header__left">{leftChild}</div>
      <div className="Header__center">{title}</div>
      <div className="Header__right">{rightChild}</div>
    </header>
  );
};

export default Header;
