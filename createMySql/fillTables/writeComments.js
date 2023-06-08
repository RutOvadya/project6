const mysql = require('mysql2');

// MySQL database connection details
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '2424',
    database: 'project6',
  });


// Function to insert a single comment record
function insertComment(comment) {
  return new Promise((resolve, reject) => {
    const { id, postId, name, email, body } = comment;
    const sql = "INSERT INTO comments (id, postId, name, email, body) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [id, postId, name, email, body], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Fetch data from the URL and insert records into the comments table
async function fetchCommentsAndInsert() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const comments = await response.json();

    for (const comment of comments) {
      await insertComment(comment);
      console.log(`Inserted comment with ID ${comment.id}`);
    }

    console.log('Comments insertion completed.');
  } catch (error) {
    console.error('Error occurred while inserting comments:', error);
  }
}

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database.');

    fetchCommentsAndInsert()
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
