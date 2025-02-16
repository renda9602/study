import { useState } from 'react';
import './List.css';
import TodoItem from './TodoItem';

const List = ({ todos, onUpdate }) => {
  const [search, setSearch] = useState('');

  const onchangeSearch = (e) => {
    // 매개변수로 setSearch 를 받아와서 전달한다.
    setSearch(e.target.value);
  };

  //<검색기능
  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }
    // includes 는
    // 메서드는 문자열에 다른 문자열이 포함되어 있는지 여부를 확인
    // true/false 로 반환한다.
    // 현재 todo의 컨텐츠에서 search 값을 찾는것.
    // (todo) => todo.content.includes(search);
    return todos.filter((todo) => todo.content.toLowerCase().includes(search));
  };

  const filteredTodos = getFilteredData();
  // 검색기능>

  return (
    <div className="List">
      <h4>Todo List 📍</h4>
      <input
        value={search}
        onChange={onchangeSearch}
        type="text"
        placeholder="검색어를 입력하세요"
      />
      <div className="Todos_wrapper">
        {/* todos 의 데이터를 받아와서 map 로 뿌려준다  */}
        {filteredTodos.map((todo) => {
          // return <div>{todo.content}</div>;
          // 모든 리스트에는 key값이 반드시 필요하다. key={todo.id}
          return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} />;
        })}
      </div>
    </div>
  );
};

export default List;
