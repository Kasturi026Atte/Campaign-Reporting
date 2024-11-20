import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './user/userRoutes.js';
import verifyToken from './middleware/authMiddleware.js';
import productRoutes from './product/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
// Auth route doesn't require a token
app.use('/api/auth', authRoutes);
//adding verification to APIs
app.use('/api/user',verifyToken, userRoutes);
app.use('/api/products',verifyToken, productRoutes);

export default app;
