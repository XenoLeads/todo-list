import { useState, useEffect, useReducer, useRef, useCallback } from "react";
import storage from "../storage.js";
import Header from "./Header";
import Filters from "./Filters";
import TodoList from "./TodoList";

const state_filters = [
  {
    id: 1,
    name: "all",
  },
  {
    id: 2,
    name: "active",
  },
  {
    id: 3,
    name: "completed",
  },
];

const intial_todos = storage.get();

function get_active_state_filter(id) {
  const index = state_filters.findIndex(filter => filter.id === id);
  if (index < 0) return null;
  return state_filters[index];
}

function reducer(todos, action) {
  switch (action.type) {
    case "toggle-todo-complete": {
      const index = todos.findIndex(todo => todo.id === action.id);
      if (index < 0) return todos;
      const new_todos = [...todos];
      new_todos[index].checked = action.checked;
      return new_todos;
    }
    case "todo-deleted": {
      return todos.filter(todo => todo.id !== action.id);
    }
    case "todo-edited": {
      const index = todos.findIndex(todo => todo.id === action.id);
      if (index < 0) return todos;
      const new_todos = [...todos];
      new_todos[index].text = action.text;
      return new_todos;
    }
    case "todo-added": {
      return [action.todo, ...todos];
    }
  }
}

function App() {
  const [activeStateFilterId, setActiveStateFilterId] = useState(1);
  const [todos, dispatch] = useReducer(reducer, intial_todos);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const latestTodoId = useRef(null);

  useEffect(() => {
    storage.save(todos);
  }, [todos]);

  function handle_state_filter_click(id) {
    if (![1, 2, 3].includes(parseInt(id))) return;
    setActiveStateFilterId(id);
  }

  function handle_todo_click(event) {
    const input = event.target;
    const id = input.dataset.id;
    setSelectedTodoId(id);
  }

  function create_new_todo() {
    const todo = {
      id: crypto.randomUUID(),
      text: "",
      checked: false,
      new: true,
    };
    dispatch({ type: "todo-added", todo });
    latestTodoId.current = todo.id;
  }

  const reset_latest_todo_id = useCallback(() => {
    latestTodoId.current = null;
  }, []);

  const handle_outside_click = useCallback(event => {
    const input = event.target;
    if (input.closest(".todo-item") === null) setSelectedTodoId(null);
  }, []);

  const handle_keypress = useCallback(
    event => {
      if (event.key === "Delete" && selectedTodoId) dispatch({ type: "todo-deleted", id: selectedTodoId });
    },
    [selectedTodoId]
  );

  useEffect(() => {
    document.addEventListener("click", handle_outside_click);
    document.addEventListener("keypress", handle_keypress);
    return () => {
      document.removeEventListener("click", handle_outside_click);
      document.removeEventListener("keypress", handle_keypress);
    };
  }, [handle_outside_click, handle_keypress]);

  return (
    <>
      <Header create_new_todo={create_new_todo} />
      <Filters state_filters={state_filters} active_state_filter_id={activeStateFilterId} handle_state_filter_click={handle_state_filter_click} />
      <TodoList
        todos={todos}
        dispatch={dispatch}
        selected_todo_id={selectedTodoId}
        on_click={handle_todo_click}
        active_state_filter={get_active_state_filter(activeStateFilterId)}
        latest_todo_id={latestTodoId}
        reset_latest_todo_id={reset_latest_todo_id}
      />
    </>
  );
}

export default App;
