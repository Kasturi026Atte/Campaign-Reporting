import ProductModel from './productModel.js';
import response from '../response/response.js'; // Assuming you have a response utility
import fs from 'fs';
import csv from 'csv-parser';
class ProductController {
    // Method to upload CSV data and insert into the database
    async uploadCSV(req, res) {
        try {
            const filePath = req.file.path;
            const products = [];

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    products.push({
                        campaignName: row['Campaign Name'],
                        adGroupID: row['Ad Group ID'],
                        fsnID: row['FSN ID'],
                        productName: row['Product Name'],
                        adSpend: parseFloat(row['Ad Spend']),
                        views: parseInt(row['Views']),
                        clicks: parseInt(row['Clicks']),
                        directRevenue: parseFloat(row['Direct Revenue']),
                        indirectRevenue: parseFloat(row['Indirect Revenue']),
                        directUnits: parseInt(row['Direct Units']),
                        indirectUnits: parseInt(row['Indirect Units'])
                    });
                })
                .on('end', async () => {
                    try {
                        // Insert product data into the database
                        await ProductModel.insertProductData(products);
                        res.status(200).send(response.successResp("CSV uploaded and data inserted successfully.", products));
                    } catch (err) {
                        res.status(500).send(response.failResp("Error inserting data into the database.", err.message));
                    }
                })
                .on('error', (err) => {
                    res.status(500).send(response.failResp("Error reading the CSV file.", err.message));
                });
        } catch (err) {
            res.status(500).send(response.failResp("Failed to upload CSV.", err.message));
        }
    }

    // Method to get product report based on filters
    async getProductReport(req, res) {
        const {
            campaignName,
            adGroupID,
            fsnID,
            productName,
            search,
            skip,
            limit,
        } = req.query;

        try {
            const stats = await productModel.getProductStats(
                'campaignName',
                campaignName,
                {
                    ...(adGroupID && { adGroupID }),
                    ...(fsnID && { fsnID }),
                    ...(productName && { productName }),
                },
                search,
                parseInt(skip),
                parseInt(limit)
            );

            res.status(200).json({
                campaign: stats,
                pagination: { skip: parseInt(skip), limit: parseInt(limit) },
            });
        } catch (err) {
            res.status(500).json({
                error: 'Error retrieving campaign statistics',
                details: err.message,
            });
        }
    }
    async getProductReportByCampaign(req, res, next) {
        try {
            const { campaignName, adGroupID, fsnID, productName } = req.query;
            const filters = { campaignName, adGroupID, fsnID, productName };

            // Call the model to retrieve the report based on filters
            const report = await ProductModel.getFilteredProductStats(filters);
            res.status(200).send(response.successResp("Product report fetched successfully.", report));
        } catch (err) {
            res.status(500).send(response.failResp("Failed to fetch product report.", err.message));
        }
    }

    // API 2: Retrieve product statistics filtered by Ad Group ID
    async getProductReportByAdGroupID(req, res, next) {
        try {
            const { adGroupID, campaignName, fsnID, productName } = req.query;
            const filters = { adGroupID, campaignName, fsnID, productName };

            // Call the model to retrieve the report based on filters
            const report = await ProductModel.getProductReport(filters);
            res.status(200).send(response.successResp("Product report fetched successfully.", report));
        } catch (err) {
            res.status(500).send(response.failResp("Failed to fetch product report.", err.message));
        }
    }

    // API 3: Retrieve product statistics filtered by FSN ID
    async getProductReportByFSN(req, res, next) {
        try {
            const { fsnID, campaignName, adGroupID, productName } = req.query;
            const filters = { fsnID, campaignName, adGroupID, productName };

            // Call the model to retrieve the report based on filters
            const report = await ProductModel.getProductReport(filters);
            res.status(200).send(response.successResp("Product report fetched successfully.", report));
        } catch (err) {
            res.status(500).send(response.failResp("Failed to fetch product report.", err.message));
        }
    }

    // API 4: Retrieve product statistics filtered by Product Name
    async getProductReportByProductName(req, res, next) {
        try {
            const { productName, campaignName, adGroupID, fsnID } = req.query;
            const filters = { productName, campaignName, adGroupID, fsnID };

            // Call the model to retrieve the report based on filters
            const report = await ProductModel.getProductReport(filters);
            res.status(200).send(response.successResp("Product report fetched successfully.", report));
        } catch (err) {
            res.status(500).send(response.failResp("Failed to fetch product report.", err.message));
        }
    }
}

export default new ProductController();
