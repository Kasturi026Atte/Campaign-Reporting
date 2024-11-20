import db from '../config/database.js';

class userModel {
  // Insert user details and return the inserted user ID
  async insertUserDetails(username, email, password) {
    console.log(username, email, password)
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
      stmt.run(username, email, password, function (err) {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(this.lastID); // Resolve with the last inserted ID
        }
      });
    });
  }

  // Get user details by ID
  async getUserDetails(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(row); // Resolve with the fetched row
        }
      });
    });
  }

  // Update user details and return the number of rows updated
  async updateUserDetails(id, username, email, password) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?');
      stmt.run(username, email, password, id, function (err) {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(this.changes); // Resolve with the number of rows updated
        }
      });
    });
  }

  // Delete user and return the number of rows deleted
  async deleteUser(id) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('DELETE FROM users WHERE id = ?');
      stmt.run(id, function (err) {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(this.changes); // Resolve with the number of rows deleted
        }
      });
    });
  }
  async getUserByUsername(userName){
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE userName = ?', [userName], (err, row) => {
          if (err) {
            reject(err); // Reject the promise if there's an error
          } else {
            resolve(row); // Resolve with the fetched row
          }
        });
      });
  }
}

export default new userModel();
