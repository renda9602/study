import { useParams } from 'react-router-dom';

// 일기 수정 페이지
const Edit = () => {
  const params = useParams();
  return <div>{params.id}번 수정페이지 입니다.</div>;
};

export default Edit;
