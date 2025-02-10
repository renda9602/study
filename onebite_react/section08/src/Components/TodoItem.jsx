import "./TodoItem.css"

const TodoItem = () => {
    return (
        <div className="todoItem">
            <input type="checkbox" />

            <div className="todoItem__wrapper">
                <div className="content">Todo...</div>
                <div className="date">Date</div>
                <button>삭제</button>
            </div>
        </div>
    )
}

export default TodoItem;
