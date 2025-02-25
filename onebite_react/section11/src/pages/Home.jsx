import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [param, setPrams] = useSearchParams();
  console.log(param.get("value"));

  // 처음 페이지 로딩시 실행되는 함수
  onload = () => {
    setPrams({ value: "hello" });
  };

  return <div>Home</div>;
};

export default Home;
