import TodoItem from "./TodoItem";

import "./List.css";

const List = () => {
    return (
        <div className="list">
            <h4>Todo List 🌱</h4>
            <input type="text" placeholder="검색어를 입력하세요." />
            <div className="todos_wrapper">
                <TodoItem />
                <TodoItem />
                <TodoItem />
            </div>
        </div>
    )
}

export default List;
