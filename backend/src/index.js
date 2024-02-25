const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'meghasql',
  database: 'shako_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create a users table if it doesn't exist
db.query(`CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
)`, (err, result) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table created or already exists');
  }
});

// Register a new user
// Register a new user
app.post('/reg', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      async (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).send('Error registering user');
          return;
        }

        const userId = result.insertId; // Get the ID of the inserted user
        // Insert user profile data into the profiles table
        db.query(
          'INSERT INTO profiles (user_id, username) VALUES (?, ?)',
          [userId, username],
          (profileErr, profileResult) => {
            if (profileErr) {
              console.error('Error creating user profile:', profileErr);
              res.status(500).send('Error creating user profile');
              return;
            }
            console.log('User registered successfully');
            res.status(200).send('User registered successfully');
          }
        );
      }
    );
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).send('Error hashing password');
  }
});
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).send('Error registering user');
        } else {
          console.log('User registered successfully');
          res.status(200).send('User registered successfully');
        }
      }
    );
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).send('Error hashing password');
  }


// Login user
app.post('/log', async (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, result) => {
      if (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Error logging in');
      } else if (result.length === 0) {
        res.status(401).send('Invalid username or password');
      } else {
        try {
          const match = await bcrypt.compare(password, result[0].password);
          if (match) {
            const userId = result[0].id; // Get the user ID from the result
            const token = jwt.sign({ userId }, 'your_secret_key', { expiresIn: '1h' }); // Include user ID in the token
            res.status(200).json({ token });
          } else {
            res.status(401).send('Invalid username or password');
          }
        } catch (error) {
          console.error('Error comparing passwords:', error);
          res.status(500).send('Error comparing passwords');
        }
      }
    }
  );
});


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token not provided');
  }
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.status(401).send('Unauthorized');
    }
    req.username = decoded.username;
    next();
  });
};

// Protected route example
// Endpoint to fetch user profile data
app.get('/profile/:userId', verifyToken, async (req, res) => {
  const userId = req.params.userId;
  try {
    // Query the database to fetch user profile data based on the user ID
    db.query('SELECT * FROM profiles WHERE user_id = ?', [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user profile:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: 'User profile not found' });
      }

      // Return the user profile data
      res.json(result[0]);
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint to update user profile data
app.put('/edit-profile/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, bio } = req.body;

  try {
    // Update the user's profile data in the database
    db.query('UPDATE profiles SET username = ?, bio = ? WHERE user_id = ?', [username, bio, userId], (err, result) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'User profile not found' });
      }

      // Return the updated user profile data
      res.json({ message: 'User profile updated successfully' });
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});