function StateFilter({ filter, active_state_filter_id, handle_state_filter_click }) {
  return (
    <button
      className={`button todo-filter todo-filter-${filter.name}${active_state_filter_id === filter.id ? " selected" : ""}`}
      onClick={() => handle_state_filter_click(filter.id)}
    >
      {filter.name}
    </button>
  );
}

function Filters({ state_filters, active_state_filter_id, handle_state_filter_click }) {
  return (
    <div className="todo-filters">
      {state_filters.map(filter => (
        <StateFilter
          key={filter.id}
          filter={filter}
          active_state_filter_id={active_state_filter_id}
          handle_state_filter_click={handle_state_filter_click}
        />
      ))}
    </div>
  );
}

export default Filters;
