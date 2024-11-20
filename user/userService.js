import userModel from './userModel.js';
import response from '../response/response.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class userService {
  // Create a new user
  async createUser(req, res) {
    try {
      const data = req?.body;
      const hashedPassword = await bcrypt.hash(data.password, 10);
      let createData = await userModel.insertUserDetails(data?.username, data?.email, hashedPassword);
      if (createData) {
        return res.status(201).send(response.successResp("User data created successfully.", createData));
      }
    } catch (err) {
      return res.status(500).send(response.failResp("Failed to create user data.", err.message));
    }
  }
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;

      // Fetch user details by username
      const user = await userModel.getUserByUsername(username);
      if (!user) {
        return res.status(401).send(response.failResp('User not found'));
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send(response.failResp('Invalid credentials'));
      }

      // Create JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

      return res.json({ message: 'Login successful', token });
    } catch (err) {
      return res.status(500).send(response.failResp('Error logging in', err.message));
    }
  }
  // Get a user by ID
  async getUser(req, res) {
    try {
      const userId = req.query.Id;
      let getData = await userModel.getUserDetails(userId);
      if (getData) {
        return res.status(200).send(response.successResp("User data fetched successfully.", getData));
      } else {
        return res.status(404).send(response.failResp("User not found."));
      }
    } catch (err) {
      return res.status(500).send(response.failResp("Failed to get user data.", err.message));
    }
  }

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const data = req.body.userDetails;
      const userId = req.query.Id; // Get user ID from query params
      let updateData = await userModel.updateUserDetails(userId, data?.username, data?.email, data?.password); // Pass user ID to update
      if (updateData > 0) {
        return res.status(200).send(response.successResp("User data updated successfully.", updateData));
      } else {
        return res.status(404).send(response.failResp("User not found or no changes made."));
      }
    } catch (err) {
      return res.status(500).send(response.failResp("Failed to update user data.", err.message));
    }
  }

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const userId = req.query.Id;
      let deleteData = await userModel.deleteUser(userId);
      if (deleteData > 0) {
        return res.status(200).send(response.successResp("User data deleted successfully.", deleteData));
      } else {
        return res.status(404).send(response.failResp("User not found."));
      }
    } catch (err) {
      return res.status(500).send(response.failResp("Failed to delete user data.", err.message));
    }
  }
}

export default new userService();
