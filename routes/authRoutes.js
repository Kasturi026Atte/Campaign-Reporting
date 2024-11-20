import express from  'express';
import userController from '../user/userController.js';
const router = express.Router();

router.post('/user/register',userController.createUser);
router.post('/user/login', userController.loginUser);

export default router;

