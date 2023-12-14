import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updateTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updateTodos);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    let filteredTodos = todos.filter((fltr) => fltr.id !== id);
    setTodos([...filteredTodos]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List</h1>

        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            placeholder="Please add your Todo"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? "Go" : "Edit"}</button>
        </form>

        <ul className="allList">
          {todos.map((item) => (
            <li className="singleList">
              <span className="singleSpan" key={item.id}>
                {item.todo}
              </span>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
