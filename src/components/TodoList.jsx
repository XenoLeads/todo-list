import unchecked_todo_icon from "../assets/icons/unchecked-todo.svg";
import checked_todo_icon from "../assets/icons/checked-todo.svg";
import remove_todo_icon from "../assets/icons/remove-todo.svg";

function Todo({ todo, dispatch }) {
  return (
    <div className="todo-item">
      <div className="todo-checkbox-text-wrapper">
        <label>
          <img src={todo.checked ? checked_todo_icon : unchecked_todo_icon} alt="" className="todo-state-icon" />
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() =>
              dispatch({
                type: "toggle-todo-complete",
                checked: !todo.checked,
                id: todo.id,
              })
            }
            className="todo-checkbox"
          />
        </label>
        <p className="todo-item-text">{todo.text}</p>
      </div>
      <button className="button">
        <img src={remove_todo_icon} alt="" className="todo-remove-icon" />
      </button>
    </div>
  );
}

function TodoList({ todos, dispatch }) {
  return (
    <div className="todo-list-container">
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default TodoList;
