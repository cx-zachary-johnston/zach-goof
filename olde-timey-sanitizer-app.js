/* 

Mock node express.js app with an olde timey sanitizer that our team shouldn't be using anymore.
This is for demoing Code Custom Rules

*/

const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

function executeQuery(sqlQuery, res) {
    // Mock sanitizer
    const sanitizedQuery = oldeTimeySanitizer(sqlQuery);
  
    db.query(sanitizedQuery, (err, results) => {
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Database error');
      } else {
        res.status(200).json(results);
      }
    });
  }

// Our once proud sanitizer which needs has been superceded by the framework's sanitizer
function oldeTimeySanitizer(input) {
    // Basic mock "sanitization"
    return input.toString().replace(/['";]/g, '');
}

// /users endpoint
app.get('/users', (req, res) => {
  const id = req.query.id; // no validation on purpose for SAST testing
  const sqlQuery = 'SELECT * FROM users WHERE id = ' + id;
  executeQuery(sqlQuery, res);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});