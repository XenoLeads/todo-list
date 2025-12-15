import { useState } from "react";
import Header from "./Header";
import Filters from "./Filters";

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

function App() {
  const [activeStateFilterId, setActiveStateFilterId] = useState(1);

  function handle_state_filter_click(id) {
    if (![1, 2, 3].includes(parseInt(id))) return;
    setActiveStateFilterId(id);
  }

  return (
    <>
      <Header />
      <Filters state_filters={state_filters} active_state_filter_id={activeStateFilterId} handle_state_filter_click={handle_state_filter_click} />
    </>
  );
}

export default App;
