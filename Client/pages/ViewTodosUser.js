import React, { useState } from "react";

const ViewTodosUser = ({ listTodos }) => {
  const [sortedTodos, setSortedTodos] = useState([...listTodos]);

  const changeFunc = () => {
    const selectBox = document.getElementById("selectBox");
    const selectedValue = selectBox.options[selectBox.selectedIndex].value;
    
    let sortedList = [...listTodos];

    if (selectedValue === "serial") {
      // Sort by serial
      sortedList.sort((a, b) => a.id - b.id);
    } else if (selectedValue === "performance") {
      // Sort by performance (completed tasks first)
      sortedList.sort((a, b) => {
        if (a.completed && !b.completed) {
          return -1;
        } else if (!a.completed && b.completed) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (selectedValue === "alphabetical") {
      // Sort alphabetically by title
      sortedList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedValue === "random") {
      // Sort randomly
      sortedList.sort(() => Math.random() - 0.5);
    }

    setSortedTodos(sortedList);
  };

  const handleChange = (id) => {
    const todos= JSON.parse(localStorage.getItem("currentUserTodos"));
    var spesificTodo=todos[id-1];
    spesificTodo.completed=!spesificTodo.completed;
    var updateTodo= todos;
    updateTodo[id-1]=spesificTodo;
    localStorage.setItem("currentUserTodos",JSON.stringify(updateTodo));
  };

  return (
    <div>&emsp;
      <select id="selectBox" name="orderby" className="orderby" onChange={changeFunc} autoFocus>
        <option value="serial">Sort by Serial</option>
        <option value="performance">Sort by Performance</option>
        <option value="alphabetical">Sort Alphabetically</option>
        <option value="random">Sort Randomly</option>
      </select>
      <div>
        {sortedTodos.map((todo) => (
          <div key={todo.id}>
            <p>&emsp;
              <input id="checkBox" 
              type="checkbox" 
              defaultChecked={todo.completed}
              onChange={() => handleChange(todo.id)} />
              {todo.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTodosUser;
