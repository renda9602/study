// 컨텍스트 가져오기 (useContext 훅을 사용하여 컨텍스트를 가져옵니다.)
// 컨텍스트는 애플리케이션 전체에서 데이터를 공유하는 데 사용됩니다.
import { useContext, useState } from 'react';
import { DiaryStateContext } from '../App';
import Button from '../components/Button';
import DiaryList from '../components/DirayList';
import Header from '../components/Header';
import usePageTitle from '../hooks/usePageTitle';

// 월별 데이터 필터링 (시작 시간과 끝 시간 사이의 데이터만 필터링)
const getMonthlyData = (pivotDate, data) => {
  // 시작 시간과 끝 시간 계산
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  // 끝 시간 계산
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  // 데이터 필터링
  return data.filter(
    // 시작 시간과 끝 시간 사이에 있는 데이터만 필터링
    item => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

// 홈 페이지 컴포넌트
const Home = () => {
  // 컨텍스트 가져오기 (useContext 훅을 사용하여 컨텍스트를 가져옵니다.)
  const data = useContext(DiaryStateContext);
  // 현재 날짜 상태 관리 (초기값은 현재 날짜)
  const [pivotDate, setPivotDate] = useState(new Date());
  // 월별 데이터 필터링 결과 상태 관리
  const monthlyData = getMonthlyData(pivotDate, data);

  // 페이지 타이틀 설정
  usePageTitle(`감정 일기장`);

  // 월 증가 및 감소 함수 정의
  const onIncreaseMonth = () => {
    // 현재 날짜에서 1달 증가
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  // 월 감소 함수 정의
  const onDecreaseMonth = () => {
    // 현재 날짜에서 1달 감소
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      {/* // 헤더 컴포넌트 렌더링 (헤더에 현재 날짜 표시) */}
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        // 왼쪽 버튼 클릭 시 월 감소, 오른쪽 버튼 클릭 시 월 증가
        leftChild={<Button onClick={onDecreaseMonth} text={'<'} />}
        rightChild={<Button onClick={onIncreaseMonth} text={'>'} />}
      />
      {/* // 일기 리스트 컴포넌트 렌더링 (월별 데이터 필터링 결과 전달) */}
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
