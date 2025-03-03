import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryStateContext } from '../App';

const useDiary = id => {
  // 커스텀 훅 생성
  const data = useContext(DiaryStateContext); // 컨텍스트에서 데이터를 가져옴
  const [curDiaryItem, setCurDiaryItem] = useState(); // 현재 일기 항목 상태 관리 (useState 훅을 사용하여 상태를 관리)
  const nav = useNavigate(); // 네비게이션 함수 가져오기

  // 컴포넌트가 마운트되거나 업데이트될 때 실행되는 효과 정의
  useEffect(() => {
    // 데이터 배열에서 현재 일기 항목 찾기 currentDiaryItem 변수에 할당
    const currentDiaryItem = data.find(item => String(item.id) === String(id)); // 현재 일기 항목의 ID와 매개변수로 전달된 ID가 일치하는지 확인);

    // 현재 일기 항목이 없으면 홈 페이지로 이동
    if (!currentDiaryItem) {
      window.alert('없는 일기입니다.');
      nav('/', { replace: true });
    }

    // 현재 일기 항목 반환
    setCurDiaryItem(currentDiaryItem); // 현재 일기 항목 상태 업데이트 (currentDiaryItem 변수의 값을 상태로 설정)
  }, [id]); // 매개변수가 변경될 때마다 실행되는 효과 정의

  return curDiaryItem;
};

export default useDiary;
