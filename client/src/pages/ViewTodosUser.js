import React, { useState } from "react";
import './ViewTodosUser.css';


const ViewTodosUser = ({ listTodos, userID }) => {
  const [sortedTodos, setSortedTodos] = useState([...(listTodos || [])]);
  //const [todos, setTodos] = useState([]);

  const [showNewTodoForm, setShowNewTodoForm] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoCompleted, setNewTodoCompleted] = useState(true);

  const API_URL = 'http://localhost:3000';


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

  const handleChange = async(id, title, completed, isChecked) => {
    const updateTodo = {
      title: title,
      completed: !completed
    };
     
    await fetch(
            `${API_URL}/todos/${userID}/${id}`, 
            {method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateTodo) })
      .then(response => response.json())
      .then(data => {
        alert(data.message); // 'Todo updated successfully'd
      })
      .catch(error => {
        alert('Error updating todo:', error);
      });
  };

  const getCurrentTodos = async()=>{
    try {
      const response = await fetch(
        `${API_URL}/todos/${userID}`,
        { method: 'GET'}
      );
      if (response.ok) {
        const listTodos = await response.json();
        if (listTodos.length === 0) {
          throw new Error("You have no Todos");
        }
        setSortedTodos(listTodos);
        return listTodos;
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      alert("" + error);
    }
  };

  const deleteTODO= async(id)=>{
    await fetch(
      `${API_URL}/todos/${userID}/${id}`, 
      {method: 'DELETE',
      headers: {'Content-Type': 'application/json'} })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // 'Todo deleted successfully'd
    })
    .catch(error => {
      alert('Error updating todo:', error);
    });

    getCurrentTodos(); //to get the update list of todos
  };

  const handleCreateTodo= async()=>{
    const newTodo = {
      title: newTodoTitle, 
      completed: newTodoCompleted
    };
      await fetch(
        `${API_URL}/todos/${userID}`,
        {method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(newTodo) })  
         .then(response => response.json())
         .then(data => {
           alert(data.message); // Todo created successfully
         })
         .catch(error => {
           alert('Error create todo:', error);
         });

        getCurrentTodos(); //to get the update list of todo
        setNewTodoTitle('');
     };

  return (
    <div>
         <div>
      {showNewTodoForm ? (
        <div id="forNewTodo">
          <label htmlFor="todoTitle">&emsp;Title:</label>
          <textarea
            type="text"
            id="todoTitle"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}/>
          <label htmlFor="postBody">copleted?</label>
          <input
          type="checkbox"
            id="todoCompleted"
            checked={newTodoCompleted}
            onChange={(e) => setNewTodoCompleted(e.target.checked)}></input>
          <button onClick={handleCreateTodo}>Create Todo</button>
          <button onClick={() => setShowNewTodoForm(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowNewTodoForm(true)}>Click here to add new todo</button>
      )}
    </div>
      &emsp;
      <select id="selectBox" name="orderby" className="orderby" onChange={changeFunc} autoFocus>
        <option value="serial">Sort by Serial</option>
        <option value="performance">Sort by Performance</option>
        <option value="alphabetical">Sort Alphabetically</option>
        <option value="random">Sort Randomly</option>
      </select>
      <div>
    { sortedTodos.length>0 ? (
      sortedTodos.map((todo) => (
          <div key={todo.id}>
            <p>&emsp;
              <input id="checkBox" 
              type="checkbox" 
              defaultChecked={todo.completed}
              onChange={(event) => handleChange(todo.id, todo.title, todo.completed, event.target.checked)}/>
              {todo.title} 
              <br></br>
              &emsp; <button className="forActions">edit the text</button>
              <button className="forActions" onClick={() => deleteTODO(todo.id)}>delete todo</button>
            </p>
          </div>
        ))) : (
          <p> &emsp; There are no Todos</p>
        )}
      </div>
    </div>
  );
};

export default ViewTodosUser;
