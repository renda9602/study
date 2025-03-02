import { useContext } from 'react'; // useContext 훅을 사용하여 컨텍스트에 접근 가능 (컨텍스트는 컴포넌트 트리 전체에 데이터를 전달하는 방법)
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App'; // DiaryDispatchContext 컨텍스트를 가져옴 (컨텍스트는 컴포넌트 트리 전체에 데이터를 전달하는 방법)
import Button from '../components/Button';
import Editor from '../components/Editor';
import Header from '../components/Header';

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext); // 컨텍스트에서 onCreate 함수를 가져옴
  const nav = useNavigate();

  const onSubmit = input => {
    // 새로운 일기 추가 함수
    onCreate(input.createdDate.getTime(), input.emotionId, input.content); // 새로운 일기 추가 함수 호출 및 인수 전달 (input 객체의 속성 값을 전달)
    nav('/', { replace: true }); // 홈 페이지로 이동 (replace: true 옵션을 사용하여 히스토리 스택에 추가하지 않고 현재 페이지를 대체)
  };

  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
