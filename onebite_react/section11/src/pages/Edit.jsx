import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();
  return <div>{params.id}번 페이지 입니다.</div>;
};

export default Edit;
