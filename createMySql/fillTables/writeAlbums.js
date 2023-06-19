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
function insertAlbum(album) {
  return new Promise((resolve, reject) => {
    const { id,  userId, title } = album;
    const sql = "INSERT INTO albums (id , userId, title) VALUES (?, ?, ?)";
    connection.query(sql, [id, userId, title], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Fetch data from the URL and insert records into the comments table
async function fetchAlbumAndInsert() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const albums = await response.json();

    for (const album of albums) {
      await insertAlbum(album);
      console.log(`Inserted album with ID ${album.id}`);
    }

    console.log('Albums insertion completed.');
  } catch (error) {
    console.error('Error occurred while inserting albums:', error);
  }
}

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database.');

    fetchAlbumAndInsert()
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
