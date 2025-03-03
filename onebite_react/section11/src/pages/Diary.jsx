// 라우터 파라미터 사용하기
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Viewer from '../components/Viewer';
import useDiary from '../hooks/useDiary';
import { getStringedDate } from '../utill/get-stringed-data';

//  일기 상세 페이지
const Diary = () => {
  // 라우터 파라미터 사용하기
  const params = useParams();
  const nav = useNavigate();
  const curDiaryItem = useDiary(params.id);
  if (!curDiaryItem) {
    return <div>...로딩중</div>;
  }

  const { createdDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={<Button text={'< 뒤로가기'} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={'수정하기'} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
