const mysql = require('mysql2');

// MySQL database connection details
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '2424',
    database: 'project6',
  });


  

// Function to insert a single todo record
function insertTodo(todo) {
  return new Promise((resolve, reject) => {
    const { id, userId, title, completed } = todo;
    const sql = "INSERT INTO todos (id, userId, title, completed) VALUES (?, ?, ?, ?)";
    connection.query(sql, [id, userId, title, completed], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Fetch data from the URL and insert records into the todos table
async function fetchTodosAndInsert() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();

    for (const todo of todos) {
      await insertTodo(todo);
      console.log(`Inserted todo with ID ${todo.id}`);
    }

    console.log('Todos insertion completed.');
  } catch (error) {
    console.error('Error occurred while inserting todos:', error);
  }
}

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database.');

    fetchTodosAndInsert()
      .then(() => {
        connection.end();
        console.log('Data insertion completed.');
      })
      .catch((error) => {
        console.error('Error occurred:', error);
        connection.end();
      });
  }
});
