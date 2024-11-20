import sqlite3 from 'sqlite3';

// Enable verbose mode for better logging of SQLite operations
sqlite3.verbose();

// Open or create the SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tables if they don't already exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    campaignName TEXT,
    adGroupID TEXT,
    fsnID TEXT,
    productName TEXT,
    adSpend REAL,
    views INTEGER,
    clicks INTEGER,
    directRevenue REAL,
    indirectRevenue REAL,
    directUnits INTEGER,
    indirectUnits INTEGER
  )`, (err) => {
    if (err) {
      console.error('Error creating products table:', err.message);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT,
    password TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    }
  });
});

// Export the db instance for use in other parts of your application
export default db;
