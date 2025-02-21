import { useContext, useMemo, useState } from "react";
import { TodoDispatchContext, TodoStateContext } from "../App";
import "./List.css";
import TodoItem from "./TodoItem";

const List = () => {
  const todos = useContext(TodoStateContext);
  const { onUpdateAll, isAllCompleted } = useContext(TodoDispatchContext);

  const [search, setSearch] = useState("");

  const onChangeCheckbox = () => {
    // 전체 체크박스를 토글하면 리스트도 모두 토글 삼항연산자 사용
    const newStatus = !isAllCompleted ? false : true;
    onUpdateAll(newStatus);
  };

  const onChangeSearch = e => {
    // 매개변수로 setSearch 를 받아와서 전달한다.
    setSearch(e.target.value);
  };

  //<검색기능
  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    // includes 는
    // 메서드는 문자열에 다른 문자열이 포함되어 있는지 여부를 확인
    // true/false 로 반환한다.
    // 현재 todo의 컨텐츠에서 search 값을 찾는것.
    // (todo) => todo.content.includes(search);
    return todos.filter(todo =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData();
  // 검색기능
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    // 메모이제이션 함수 호출
    console.log("getAnalyzedData 호출");

    const totalCount = todos.length;
    const doneCount = todos.filter(todo => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
    // 메모이제이셔션 함수 호출>
  }, [todos]);
  // 의존성 배열: deps

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total : {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="Todos_wrapper">
        <div className="checkAll">
          <label>
            <input onChange={onChangeCheckbox} type="checkbox" />
            전체선택
          </label>
        </div>
        {/* todos 의 데이터를 받아와서 map 로 뿌려준다  */}
        {filteredTodos.map(todo => {
          // return <div>{todo.content}</div>;
          // 모든 리스트에는 key값이 반드시 필요하다. key={todo.id}
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
