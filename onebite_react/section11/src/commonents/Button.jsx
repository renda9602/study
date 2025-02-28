import './Button.css';

// 버튼 컴포넌트
const Button = ({ text, type, onClick }) => {
  return (
    <button onClick={onClick} className={`Button Button__${type}`}>
      {text}
    </button>
  );
};

export default Button;
