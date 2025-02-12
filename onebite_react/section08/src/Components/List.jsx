import { useState } from "react";
import "./List.css";
import TodoItem from "./TodoItem";

const List = ({ todos, onUpdate, onDelete }) => {
  // 검색어를 저장할 state
  const [search, setSearch] = useState("");

  // 검색어 입력 시 실행되는 이벤트 핸들러
  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  // 검색 필터링 함수
  const getFilterData = () => {
    // 검색어가 없으면 전체 todos 반환
    if (search === "") {
      return todos;
    }
    // 검색어가 있으면 필터링된 todos 반환
    // toLowerCase()로 대소문자 구분 없이 검색
    return todos.filter(todo =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  // 필터링된 결과를 변수에 저장
  const filteredTodos = getFilterData();

  return (
    <div className="list">
      <h4>Todo List 🌱</h4>

      {/* 검색 입력창 */}
      <input
        type="text"
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요."
      />
      <div className="todos_wrapper">
        {/* 필터링된 할 일 목록을 매핑하여 TodoItem 컴포넌트로 렌더링 */}
        {/* spread 연산자(...todo)로 todo 객체의 모든 속성을 props로 전달 */}
        {filteredTodos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
