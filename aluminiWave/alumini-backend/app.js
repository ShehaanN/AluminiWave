// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
      [email, password, role]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Something went wrong');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
