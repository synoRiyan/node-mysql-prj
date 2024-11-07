const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'myapp'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/
// Serve HTML form
app.get('/', (req, res) => {
    db.query('SELECT * FROM records', (err, results) => {
      if (err) throw err;
      res.send(renderHTML(results));
    });
  });

  // Add record
app.post('/add', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO records (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  // Delete record
  app.post('/delete', (req, res) => {
    const { id } = req.body;
    const query = 'DELETE FROM records WHERE id = ?';
    db.query(query, [id], (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  // Helper to render HTML with records
  function renderHTML(records) {
    let rows = records.map(record => `
      <tr>
        <td>${record.id}</td>
        <td>${record.name}</td>
        <td>${record.email}</td>
        <td>
          <form action="/delete" method="POST" style="display:inline;">
            <input type="hidden" name="id" value="${record.id}">
            <button type="submit">Delete</button>
          </form>
        </td>
      </tr>
    `).join('');
    
    return `
      <html>
      <head>
        <title>Record Management</title>
      </head>
      <body>
        <h2>Add New Record</h2>
        <form action="/add" method="POST">
          <label>Name:</label><input type="text" name="name" required><br>
          <label>Email:</label><input type="email" name="email" required><br>
          <button type="submit">Add Record</button>
        </form>
        <h2>Record List</h2>
        <table border="1">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
          ${rows}
        </table>
      </body>
      </html>
    `;
  }

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
