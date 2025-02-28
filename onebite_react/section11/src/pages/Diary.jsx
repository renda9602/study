// 라우터 파라미터 사용하기
import { useParams } from 'react-router-dom';

//  일기 상세 페이지
const Diary = () => {
  // 라우터 파라미터 사용하기
  const params = useParams();
  console.log(params);

  return (
    <div>
      <h1>Diary</h1>
      <p>{params.id}번 일기입니다.</p>
    </div>
  );
};

export default Diary;
