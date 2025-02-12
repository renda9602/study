import { useReducer } from "react";

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "INCREASE":
      return state + action.date;
    case "DECREASE":
      return state - action.date;
    default:
      return state;
  }
}

const Exam = () => {
  //dispatch : 발송 -> 상태변화가 있어야 한다는 사실을 알리는 발송하는 함수
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    // 인수: 상태가 어떻게 변화되길 원하는지?
    //액션 객체
    dispatch({
      type: "INCREASE",
      date: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      date: 1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>count +</button>
      <button onClick={onClickMinus}>count -</button>
    </div>
  );
};

export default Exam;
