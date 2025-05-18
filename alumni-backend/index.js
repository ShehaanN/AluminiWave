const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',      // your postgres username
  host: 'localhost',
  database: 'alumni_db',
  password: 'buthmika', // your postgres password
  port: 5432,
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
      [email, password, role]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') { // unique_violation
      res.status(409).json({ error: 'Email already registered' });
    } else {
      res.status(500).json({ error: 'Database error' });
    }
  }
});
app.post('/profile', async (req, res) => {
  const {
    firstName,
    secondName,
    headline,
    graduationYear,
    major,
    jobTitle,
    company,
    location,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO profiles
        (first_name, second_name, headline, graduation_year, major, job_title, company, location)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [firstName, secondName, headline, graduationYear, major, jobTitle, company, location]
    );
    res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
