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
    checked: false,
  },
];

function reducer(todos, action) {
  switch (action.type) {
    case "toggle-todo-complete": {
      const index = todos.findIndex(todo => todo.id === action.id);
      if (index < 0) return todos;
      const new_todos = [...todos];
      new_todos[index].checked = action.checked;
      return new_todos;
    }
  }
}

function App() {
  const [activeStateFilterId, setActiveStateFilterId] = useState(1);
  const [todos, dispatch] = useReducer(reducer, intial_todos);

  function handle_state_filter_click(id) {
    if (![1, 2, 3].includes(parseInt(id))) return;
    setActiveStateFilterId(id);
  }

  return (
    <>
      <Header />
      <Filters state_filters={state_filters} active_state_filter_id={activeStateFilterId} handle_state_filter_click={handle_state_filter_click} />
      <TodoList todos={todos} dispatch={dispatch} />
    </>
  );
}

export default App;
