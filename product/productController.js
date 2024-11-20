import productService from './productService.js'; // Assuming you have a productService.js for the business logic

class productController {
    async uploadCSV(req, res, next) {
        /* #swagger.tags = ['Product']
           #swagger.description = 'This route is used to upload a CSV file and insert product data into the database'  */

        /*	#swagger.parameters['file'] = {
                in: 'formData',
                description: 'CSV file containing product data',
                required: true,
                type: 'file'
        } */
        return await productService.uploadCSV(req, res, next);
    }

    async getProductReport(req, res, next) {
        /* #swagger.tags = ['Product']
           #swagger.description = 'This route is used to fetch product report based on filters'  */

        /*	#swagger.parameters['campaignName'] = {
                in: 'query',
                description: 'Filter by Campaign Name',
                required: false,
                
        } */
        /*	#swagger.parameters['adGroupID'] = {
                in: 'query',
                description: 'Filter by Ad Group ID',
                required: false,
                
        } */
        /*	#swagger.parameters['fsnID'] = {
                in: 'query',
                description: 'Filter by FSN ID',
                required: false,
                
        } */
        /*	#swagger.parameters['productName'] = {
                in: 'query',
                description: 'Filter by Product Name',
                required: false,
                
        } */
        /*	#swagger.parameters['skip'] = {
                 in: 'query',
                 description: 'skip value',
                 required: false,
                 
         } */
        /*	#swagger.parameters['limit'] = {
                in: 'query',
                description: 'limit value',
                required: false,
                
        } */
        /* #swagger.parameters['search'] = {
                in: 'query',
                description: 'Search term for partial matching across campaign name, product name, FSN ID, or Ad Group ID.',
                required: false,
                type: 'string'
        } */
        return await productService.getProductReport(req, res, next);
    }
    async getProductReportByCampaign(req, res, next) {
        /* #swagger.tags = ['Product-Filter']
           #swagger.description = 'This route is used to fetch product statistics filtered by Campaign Name.'  */

        /*	#swagger.parameters['campaignName'] = {
                in: 'query',
                description: 'Filter products by Campaign Name',
                required: true,
                type: 'string',
        } */
        /*	#swagger.parameters['adGroupID'] = {
                in: 'query',
                description: 'Optional filter for Ad Group ID',
                required: false,
                type: 'string',
        } */
        /*	#swagger.parameters['fsnID'] = {
                in: 'query',
                description: 'Optional filter for FSN ID',
                required: false,
                type: 'string',
        } */
        /*	#swagger.parameters['productName'] = {
                in: 'query',
                description: 'Optional filter for Product Name',
                required: false,
                type: 'string',
        } */
        /*	#swagger.parameters['skip'] = {
                 in: 'query',
                 description: 'skip value',
                 required: false,
                 
         } */
        /*	#swagger.parameters['limit'] = {
                in: 'query',
                description: 'limit value',
                required: false,
                
        } */
        return await productService.getProductReportByCampaign(req, res, next);
    }

    // API 2: Retrieve product statistics filtered by Ad Group ID
    async getProductReportByAdGroupID(req, res, next) {
        /* #swagger.tags = ['Product-Filter']
           #swagger.description = 'This route is used to fetch product statistics filtered by Ad Group ID.'  */

        /*	#swagger.parameters['adGroupID'] = {
                in: 'query',
                description: 'Filter products by Ad Group ID',
                required: true,
                type: 'string',
                
        } */
        /*	#swagger.parameters['campaignName'] = {
                in: 'query',
                description: 'Optional filter for Campaign Name',
                required: false,
                type: 'string',
                
        } */
        /*	#swagger.parameters['fsnID'] = {
                in: 'query',
                description: 'Optional filter for FSN ID',
                required: false,
                type: 'string',
                
        } */
        /*	#swagger.parameters['productName'] = {
                in: 'query',
                description: 'Optional filter for Product Name',
                required: false,
                type: 'string',
                
        } */
        /*	#swagger.parameters['skip'] = {
                 in: 'query',
                 description: 'skip value',
                 required: false,
                 
         } */
        /*	#swagger.parameters['limit'] = {
                in: 'query',
                description: 'limit value',
                required: false,
                
        } */
        return await productService.getProductReportByAdGroupID(req, res, next);
    }

    // API 3: Retrieve product statistics filtered by FSN ID
    async getProductReportByFSN(req, res, next) {
        /* #swagger.tags = ['Product-Filter']
           #swagger.description = 'This route is used to fetch product statistics filtered by FSN ID.'  */

        /*	#swagger.parameters['fsnID'] = {
                in: 'query',
                description: 'Filter products by FSN ID',
                required: true,
                type: 'string',
                
        } */
        /*	#swagger.parameters['campaignName'] = {
                in: 'query',
                description: 'Optional filter for Campaign Name',
                required: false,
                type: 'string'
        } */
        /*	#swagger.parameters['adGroupID'] = {
                in: 'query',
                description: 'Optional filter for Ad Group ID',
                required: false,
                type: 'string',
                
        } */
        /*	#swagger.parameters['productName'] = {
                in: 'query',
                description: 'Optional filter for Product Name',
                required: false,
                type: 'string',
                
        } */
        /*	#swagger.parameters['skip'] = {
                 in: 'query',
                 description: 'skip value',
                 required: false,
                 
         } */
        /*	#swagger.parameters['limit'] = {
                in: 'query',
                description: 'limit value',
                required: false,
                
        } */
        return await productService.getProductReportByFSN(req, res, next);
    }

    // API 4: Retrieve product statistics filtered by Product Name
    async getProductReportByProductName(req, res, next) {
        /* #swagger.tags = ['Product-Filter']
           #swagger.description = 'This route is used to fetch product statistics filtered by Product Name.'  */

        /*	#swagger.parameters['productName'] = {
                in: 'query',
                description: 'Filter products by Product Name',
                required: true,
                type: 'string',
                
        } */
        /*	#swagger.parameters['campaignName'] = {
                in: 'query',
                description: 'Optional filter for Campaign Name',
                required: false,
                type: 'string',
                
        } */
        /*	#swagger.parameters['adGroupID'] = {
                in: 'query',
                description: 'Optional filter for Ad Group ID',
                required: false,
                type: 'string',
                
        } */
        /*	#swagger.parameters['fsnID'] = {
                in: 'query',
                description: 'Optional filter for FSN ID',
                required: false,
                type: 'string',
                
        } */
        /*	#swagger.parameters['skip'] = {
                 in: 'query',
                 description: 'skip value',
                 required: false,
                 
         } */
        /*	#swagger.parameters['limit'] = {
                in: 'query',
                description: 'limit value',
                required: false,
                
        } */
        return await productService.getProductReportByProductName(req, res, next);
    }
}

export default new productController();
