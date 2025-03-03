import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import Button from '../components/Button';
import Editor from '../components/Editor';
import Header from '../components/Header';

// 일기 수정 페이지
const Edit = () => {
  const params = useParams(); // 현재 경로의 매개변수 가져오기 (useParams 훅을 사용하여 현재 경로의 매개변수를 가져옴)
  const nav = useNavigate(); // 네비게이션 함수 가져오기
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext); // 컨텍스트에서 onDelete 함수를 가져옴
  const data = useContext(DiaryStateContext); // 컨텍스트에서 데이터를 가져옴
  const [curDiaryItem, setCurDiaryItem] = useState(); // 현재 일기 항목 상태 관리 (useState 훅을 사용하여 상태를 관리)

  // 컴포넌트가 마운트되거나 업데이트될 때 실행되는 효과 정의
  useEffect(() => {
    // 데이터 배열에서 현재 일기 항목 찾기 currentDiaryItem 변수에 할당
    const currentDiaryItem = data.find(
      item => String(item.id) === String(params.id)
    ); // 현재 일기 항목의 ID와 매개변수로 전달된 ID가 일치하는지 확인);

    // 현재 일기 항목이 없으면 홈 페이지로 이동
    if (!currentDiaryItem) {
      window.alert('없는 일기입니다.');
      nav('/', { replace: true });
    }

    // 현재 일기 항목 반환
    setCurDiaryItem(currentDiaryItem); // 현재 일기 항목 상태 업데이트 (currentDiaryItem 변수의 값을 상태로 설정)
  }, [params.id]); // 매개변수가 변경될 때마다 실행되는 효과 정의

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
