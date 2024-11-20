import express from 'express';
import userController from './userController.js';
const router = express.Router();

// Get user details by ID
router.get('/fetch', userController.getUser);

// Update user details by ID
router.put('/update', userController.updateUser);

// Delete a user by ID
router.delete('/delete', userController.deleteUser);
export default router;
