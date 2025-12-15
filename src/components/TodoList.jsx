import { useRef, useEffect } from "react";
import unchecked_todo_icon from "../assets/icons/unchecked-todo.svg";
import checked_todo_icon from "../assets/icons/checked-todo.svg";
import remove_todo_icon from "../assets/icons/remove-todo.svg";

function resize_textarea(event) {
  const input = event.target;
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
}

function Todo({ todo, dispatch, selected_todo_id, on_click }) {
  const textarea_ref = useRef(null);

  useEffect(() => {
    textarea_ref.current.style.height = "auto";
    textarea_ref.current.style.height = textarea_ref.current.scrollHeight + "px";
  }, []);

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
        <textarea
          name="todo-item-text"
          className="todo-item-text"
          value={todo.text}
          onChange={e =>
            dispatch({
              type: "todo-edited",
              text: e.target.value,
              id: todo.id,
            })
          }
          rows={1}
          onInput={resize_textarea}
          ref={textarea_ref}
          spellCheck="false"
        ></textarea>
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

function filter_todos(todos, active_only = true) {
  if (active_only) return todos.filter(todo => todo.checked === false);
  return todos.filter(todo => todo.checked === true);
}

function TodoList({ todos, dispatch, on_click, selected_todo_id, active_state_filter }) {
  return (
    <div className="todo-list-container">
      {active_state_filter && active_state_filter.name !== "all"
        ? filter_todos(todos, active_state_filter.name === "active").map(todo => (
            <Todo key={todo.id} todo={todo} dispatch={dispatch} selected_todo_id={selected_todo_id} on_click={on_click} />
          ))
        : todos.map(todo => <Todo key={todo.id} todo={todo} dispatch={dispatch} selected_todo_id={selected_todo_id} on_click={on_click} />)}
    </div>
  );
}

export default TodoList;
