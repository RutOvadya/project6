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
function insertPhoto(photo) {
  return new Promise((resolve, reject) => {
    const { id, albumId, title, thumbnailUrl } = photo;
    const sql = "INSERT INTO photos (id, albumId, title, thumbnailUrl) VALUES (?, ?, ?, ?)";
    connection.query(sql, [id, albumId, title, thumbnailUrl], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Fetch data from the URL and insert records into the comments table
async function fetchPhotosAndInsert() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    const photos = await response.json();

    for (const photo of photos) {
      await insertPhoto(photo);
      console.log(`Inserted photo with ID ${photo.id}`);
    }

    console.log('Photos insertion completed.');
  } catch (error) {
    console.error('Error occurred while inserting photos:', error);
  }
}

// Connect to the MySQL database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database.');
    fetchPhotosAndInsert()
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
