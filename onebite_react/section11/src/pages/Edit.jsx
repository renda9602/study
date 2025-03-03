import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryDispatchContext } from '../App';
import Button from '../components/Button';
import Editor from '../components/Editor';
import Header from '../components/Header';
import useDiary from '../hooks/useDiary';
import usePageTitle from '../hooks/usePageTitle';

// 일기 수정 페이지
const Edit = () => {
  const params = useParams(); // 현재 경로의 매개변수 가져오기 (useParams 훅을 사용하여 현재 경로의 매개변수를 가져옴)
  const nav = useNavigate(); // 네비게이션 함수 가져오기
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext); // 컨텍스트에서 onDelete 함수를 가져옴
  const curDiaryItem = useDiary(params.id); // useDiary 커스텀 훅을 사용하여 현재 일기 항목을 가져옴

  // 페이지 타이틀 설정
  usePageTitle(`${params.id}번 일기 수정`);

  // 일기 수정 함수
  const onClickDelete = () => {
    // 일기 삭제 함수
    if (window.confirm('정말 삭제하시겠습니까? 다시 복구되지 않아요')) {
      //  삭제 확인 메시지 표시 및 삭제 수행
      onDelete(params.id); // 일기 삭제 함수 호출 및 인수 전달 (params.id는 삭제할 일기의 ID)
      nav('/', { replace: true }); // 홈 페이지로 이동 (replace: true 옵션을 사용하여 히스토리 스택에 추가하지 않고 현재 페이지를 대체)
    }
  };

  const onSubmit = input => {
    // 일기 수정 함수 호출 및 인수 전달
    if (window.confirm('일기를 정말 수정하시겠습니까?')) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
        // (params.id는 수정할 일기의 ID,/
        //input.createdDate.getTime()는 수정된 일기의 날짜
        // input.emotionId는 수정된 일기의 감정 ID
        // input.content는 수정된 일기의 내용)
      );
      nav('/', { replace: true }); // 홈 페이지로 이동 (replace: true 옵션을 사용하여 히스토리 스택에 추가하지 않고 현재 페이지를 대체)
    }
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={
          <Button
            text={'< 뒤로가기'}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          <Button text={'삭제하기'} type={'NEGATIVE'} onClick={onClickDelete} />
        }
      />
      <Editor intiData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
