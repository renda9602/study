import { useParams } from "react-router-dom";

const Diary = () => {
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
