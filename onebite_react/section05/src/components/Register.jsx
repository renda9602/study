import { useState } from "react";

//회원가입 폼
// 이름
// 생년월일
// 국적
// 자기소개

const Register = () => {
  // const [name, setName] = useState("이름");
  // const [birth, setBrith] = useState("");
  // const [country, setContry] = useState("국적");
  // const [bio, setBio] = useState("자기소개");

  const [input, setInput] = useState({
    name:"",
    birth:"",
    country:"",
    bio:"",
  });

  const onChange = (e) => {
    console.log(e.target.name, e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

    return (
    <div>
      <div>
        <input name="name"
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

    </div>
    )
};

export default Register;
