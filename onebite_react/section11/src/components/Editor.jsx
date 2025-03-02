import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './Editor.css';
import EmotionItem from './EmotionItem';

const emotionList = [
  {
    emotionId: 1,
    emotionName: '완전 좋음',
  },
  {
    emotionId: 2,
    emotionName: '완전 좋음',
  },
  {
    emotionId: 3,
    emotionName: '그럭저럭',
  },
  {
    emotionId: 4,
    emotionName: '나쁨',
  },
  {
    emotionId: 5,
    emotionName: '느좋 나쁨',
  },
];
const getStringDate = targetDate => {
  // 날짜형식 변경 함수
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  // 월 또는 일이 한자리 수일 경우 앞에 0을 붙여주는 코드
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  return `${year}-${month}-${date}`;
};

const Editor = ({ onSubmit }) => {
  // new 페이지에서 Editor 컴포넌트를 사용하면, 새로운 일기를 작성하는 페이지가 되고,
  // edit 페이지에서 Editor 컴포넌트를 사용하면, 기존에 작성된 일기를 수정하는 페이지가 됩니다.
  // 그래서 이 컴포넌트에서 작성된 일기의 내용을 저장하는 함수를 만들어야 합니다.
  // 그런데 이 컴포넌트는 새로운 일기를 작성하는 페이지에서도 사용되고, 기존에 작성된 일기를 수정하는 페이지에서도 사용되기 때문에,
  // 이 컴포넌트에서 작성된 일기의 내용을 저장하는 함수를 만들 때,
  // 새로운 일기를 작성하는 페이지에서 사용될 함수와 기존에 작성된 일기를 수정하는 페이지에서 사용될 함수를 따로 만들어야 합니다.
  const [input, setInput] = useState({
    createdDate: new Date(), //문자열로 저장
    cmotionId: 3,
    content: '',
  });

  const onChangeInput = e => {
    console.log(e.target.name); // 어떤 요소에 입력이 들어왔는지 콘솔에 출력
    console.log(e.target.value); // 어떤 요소에 입력된값이 들어왔는지 콘솔에 출력

    let name = e.target.name; // 입력된 요소의 name 속성 값을 가져옴
    let value = e.target.value; // 입력된 요소의 value 속성 값을 가져옴
    if (name === 'createdDate') {
      // 만약 name 속성 값이 createdDate라면
      value = new Date(value); // value 변수에 새로운 Date 객체를 할당
    }
    setInput({
      ...input, /// 기존의 input 객체를 유지하면서
      [name]: value, // name 속성 값을 가진 속성에 value 값을 할당
    });
  };

  const onSubmitButtonClick = () => {
    onSubmit(input); // onSubmit 함수를 호출하고, input 객체를 인수로 전달
  };

  const nav = useNavigate();

  return (
    <div className="Editor">
      <section className="date_setion">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate" // name 속성 값을 설정 하여 입력 요소의 이름을 지정
          onChange={onChangeInput}
          value={getStringDate(input.createdDate)}
          type="date"
        />
      </section>
      <section className="emotion_setion">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map(item => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_setion">
        <h4>오늘의 일기</h4>
        <textarea
          name="content" // name 속성 값을 설정 하여 입력 요소의 이름을 지정
          onChange={onChangeInput} // 입력 값이 변경될 때마다 onChangeInput 함수를 호출하여 value에 속성 값을 가져옴
          placeholder="오늘 일기를 작성해보세요."
        ></textarea>
      </section>
      <section className="button_setion">
        <Button text={'취소하기'} onClick={() => nav(-1)} />
        <Button
          // 클릭했을때 props 로 전달받은 값을 실행
          onClick={onSubmitButtonClick}
          text={'작성 완료'}
          type={'POSITIVE'}
        />
      </section>
    </div>
  );
};

export default Editor;
