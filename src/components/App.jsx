import { useState, useReducer } from "react";
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

const intial_todos = [
  {
    id: crypto.randomUUID(),
    text: "This is a todo",
    checked: false,
  },
  {
    id: crypto.randomUUID(),
    text: "This is another todo",
    checked: true,
  },
  {
    id: crypto.randomUUID(),
    text: "This is yet another todo",
    checked: false,
  },
];

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
  }
}

function App() {
  const [activeStateFilterId, setActiveStateFilterId] = useState(1);
  const [todos, dispatch] = useReducer(reducer, intial_todos);
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  function handle_state_filter_click(id) {
    if (![1, 2, 3].includes(parseInt(id))) return;
    setActiveStateFilterId(id);
  }

  function handle_todo_click(event) {
    const input = event.target;
    const id = input.dataset.id;
    setSelectedTodoId(id);
  }

  return (
    <>
      <Header />
      <Filters state_filters={state_filters} active_state_filter_id={activeStateFilterId} handle_state_filter_click={handle_state_filter_click} />
      <TodoList
        todos={todos}
        dispatch={dispatch}
        selected_todo_id={selectedTodoId}
        on_click={handle_todo_click}
        active_state_filter={get_active_state_filter(activeStateFilterId)}
      />
    </>
  );
}

export default App;
