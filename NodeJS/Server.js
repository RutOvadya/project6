const express = require('express');
const mysql = require('mysql2');
// const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '2424',
database: 'project6',
});

db.connect((err) => {
if (err) {
    console.error('Error connecting to the database: ', err);
    return;
}
console.log('Connected to the database');
});

// Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
//all the files

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// ... Other server setup and configurations ...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// Routes


// Implement similar CRUD operations for other routes (posts, todos, comments, usersPass)

// Start the server
// app.listen(port, () => {
// console.log(`Server running on port ${port}`);
// });


// // Gracefully handle termination signals
// process.on('SIGINT', () => {
//     console.log('Received SIGINT signal. Closing server gracefully...');
//     server.close(() => {
//       console.log('Server closed.');
//       process.exit();
//     });
//   });



