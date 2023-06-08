const mysql = require('mysql2');

// MySQL database connection details
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '2424',
  database: 'project6'
});

// Function to insert a single post record
function insertPost(post) {
  return new Promise((resolve, reject) => {
    const { id, userId, title, body } = post;
    const sql = `INSERT INTO posts (id, userId, title, body) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [id, userId, title, body], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Function to insert a single user record
function insertUser(user) {
  return new Promise((resolve, reject) => {
    const { id, name, username, email, address, phone } = user;
    console.log(id);
    const sql = "INSERT INTO users (id, name, username, email, address, phone) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, [id, name, username, email, address.street, phone], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Fetch data from the URL and insert records into the posts table
async function fetchPostsAndInsert() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    for (const post of posts) {
      await insertPost(post);
      console.log(`Inserted post with ID ${post.id}`);
    }

    console.log('Posts insertion completed.');
  } catch (error) {
    console.error('Error occurred while inserting posts:', error);
  }
}

// Fetch data from the URL and insert records into the users table
async function fetchUsersAndInsert() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    for (const user of users) {
      await insertUser(user);
      console.log(`Inserted user with ID ${user.id}`);
    }

    console.log('Users insertion completed.');
  } catch (error) {
    console.error('Error occurred while inserting users:', error);
  }
}

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database.');
    fetchUsersAndInsert();
  }
});


