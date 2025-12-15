import unchecked_todo_icon from "../assets/icons/unchecked-todo.svg";
import checked_todo_icon from "../assets/icons/checked-todo.svg";
import remove_todo_icon from "../assets/icons/remove-todo.svg";

function Todo({ todo, dispatch, selected_todo_id, on_click }) {
  return (
    <div className={`todo-item${selected_todo_id === todo.id ? " selected" : ""}`} data-id={todo.id} onClick={on_click}>
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
      <button
        className="button todo-remove-button"
        onClick={() => {
          dispatch({
            type: "todo-deleted",
            id: todo.id,
          });
        }}
      >
        <img src={remove_todo_icon} alt="" className="todo-remove-icon" />
      </button>
    </div>
  );
}

function TodoList({ todos, dispatch, on_click, selected_todo_id }) {
  return (
    <div className="todo-list-container">
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} dispatch={dispatch} selected_todo_id={selected_todo_id} on_click={on_click} />
      ))}
    </div>
  );
}

export default TodoList;
