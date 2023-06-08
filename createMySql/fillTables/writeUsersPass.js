const mysql = require('mysql2');
const https = require('https');


// MySQL database connection details
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '2424',
    database: 'project6',
  });


// Function to insert a user into the usersR table
const insertUser = (user) => {
  return new Promise((resolve, reject) => {
    const { id, name } = user;
    const password = 123;

    const sql = 'INSERT INTO usersR (id, name, password) VALUES (?, ?, ?)';
    const values = [id, name, password];

    connection.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

// Fetch users from the API
const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      path: '/users',
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', async () => {
        try {
          const users = JSON.parse(data);

          // Insert users into the usersR table
          for (const user of users) {
            await insertUser(user);
          }

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

// Call the fetchUsers function
fetchUsers()
  .then(() => {
    console.log('All users inserted');
  })
  .catch((error) => {
    console.error('Error fetching users:', error);
  });
