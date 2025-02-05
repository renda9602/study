import { useState, useRef } from "react";

//회원가입 폼
// 이름
// 생년월일
// 국적
// 자기소개

const Register = () => {

  const [input, setInput] = useState({
    name:"",
    birth:"",
    country:"",
    bio:"",
  });

  const countRef = useRef(0);
  const inputRef = useRef();

  // 화면 업데이트가 필요한 값은 useState 사용
  const [counts, setCount] = useState(0);
  // 화면 업데이트가 필요없는 값은 useRef 사용
  const countsRef = useRef(0);


  // 목록관리
  const [todos, setTodosUl] = useState([]);
  const [inputUlValue, setInputUlValue] = useState("");

  const addTodo = () => {
    setTodosUl([...todos, inputUlValue]);
    setInputUlValue("");  // 입력창 초기화
  };


  const onSubmit = () => {
    if (input.name === "") {
      // 이름을 입력하는 DOM 요소 포커스
      // console.log(inputRef.current);
      inputRef.current.focus();
    }
  };

  const onChange = (e) => {
    // countRef.current++;
    console.log(countRef.current);

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

    return (
    <div>
      <div>
        <input
        ref={inputRef}
        name="name"
        value={input.name}
        onChange={onChange}
        placeholder={input.name} />
      </div>
      {input.name}

      <div>
        <input name="birth"
        type="date"
        onChange={onChange}
        value={input.birth} />
      </div>
      {input.birth}


      <div>
        <select name="country"
        onChange={onChange}
        value={input.country} >
          <option>국적</option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="eu">영국</option>
        </select>
        {input.country}
      </div>

      <div>
        <textarea name="bio"
        onChange={onChange}
        placeholder={input.bio}/>
      </div>
      {input.bio}

      <button onClick={onSubmit}>제출</button>

      {/* 화면카운트 됨 //참조만 됨 */}
      <div>
        <p>화면에 표시되는 카운트: {counts}</p>
        <p>참조로만 사용되는 카운트: {countsRef.current}</p>

        <button onClick={() => setCount(counts + 1)}>
            화면 카운트 증가
        </button>

        <button onClick={() => {
            countRef.current += 1;
            console.log('참조 카운트:', countsRef.current);
        }}>
            참조 카운트 증가 (화면 변화 없음)
        </button>
      </div>

      <div>
        <input
          value={inputUlValue}
          onChange={(e) => setInputUlValue(e.target.value)}
        />
        <button onClick={addTodo}>추가</button>

        <ul>
          {todos.map((todo, index) => (
              <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </div>
    )
};

export default Register;
