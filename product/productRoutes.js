import express from 'express';
import ProductController from './productController.js'; 
import upload from '../middleware/uploadMiddleware.js'; 

const router = express.Router();

// Upload CSV route
router.post('/upload-csv', upload.single('file'), ProductController.uploadCSV);
router.get('/get-report', ProductController.getProductReport);
router.get('/get-report/campaign', ProductController.getProductReportByCampaign);
router.get('/get-report/groupId', ProductController.getProductReportByAdGroupID);
router.get('/get-report/fsn', ProductController.getProductReportByFSN);
router.get('/get-report/ProductName', ProductController.getProductReportByProductName);

export default router;
