import "./Button.css";

const Button = ({ text, type, onClick }) => {
  return (
    <button onClick={onClick} className={`Button Button__${type}`}>
      {text}
    </button>
  );
};

export default Button;
