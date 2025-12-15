import add_button_icon from "../assets/icons/add.svg";

function Header({ create_new_todo }) {
  return (
    <div className="header">
      <h1>Todo</h1>
      <button className="button add-todo-button" onClick={create_new_todo}>
        <img src={add_button_icon} alt="add todo" className="add-button-icon" />
      </button>
    </div>
  );
}
export default Header;
