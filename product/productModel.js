import db from '../config/database.js'; // Importing your DB configuration

class ProductModel {
  // Insert product data into the database and return the last inserted ID
  async insertProductData(products) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT INTO products (campaignName, adGroupID, fsnID, productName, adSpend, views, clicks, directRevenue, indirectRevenue, directUnits, indirectUnits)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      // Insert each product into the database
      const insertPromises = products.map(product => {
        return new Promise((resolve, reject) => {
          stmt.run(
            product.campaignName,
            product.adGroupID,
            product.fsnID,
            product.productName,
            product.adSpend,
            product.views,
            product.clicks,
            product.directRevenue,
            product.indirectRevenue,
            product.directUnits,
            product.indirectUnits,
            function (err) {
              if (err) {
                reject(err); // Reject the promise if there's an error
              } else {
                resolve(this.lastID); // Resolve with the last inserted ID
              }
            }
          );
        });
      });

      // Wait for all insertions to complete
      Promise.all(insertPromises)
        .then(() => resolve('Data inserted successfully'))
        .catch(reject);
    });
  }

  // Get product report based on filters and return the fetched results
  async  getProductStats(mainFilterKey, mainFilterValue, filters = {}, searchTerm = null, userSkip, userLimit) {
    let query = `
        SELECT 
            ${mainFilterKey} AS mainFilter,
            SUM(adSpend) AS adSpend,
            SUM(views) AS views,
            SUM(clicks) AS clicks,
            CASE 
                WHEN SUM(views) > 0 THEN (SUM(clicks) * 100.0 / SUM(views)) 
                ELSE 0 
            END AS ctrPercent,
            SUM(directRevenue + indirectRevenue) AS totalRevenue,
            SUM(directUnits + indirectUnits) AS totalOrders,
            CASE 
                WHEN SUM(adSpend) > 0 THEN (SUM(directRevenue + indirectRevenue) / SUM(adSpend)) 
                ELSE 0 
            END AS roas
        FROM products
        WHERE ${mainFilterKey} = ?`;

    const params = [mainFilterValue];

    // Add dynamic filters based on input
    Object.keys(filters).forEach((key) => {
        query += ` AND ${key} = ?`;
        params.push(filters[key]);
    });

    // Add search functionality
    if (searchTerm) {
        query += ` AND (
            campaignName LIKE ? OR 
            productName LIKE ? OR 
            adGroupID LIKE ? OR 
            fsnID LIKE ?
        )`;
        const searchValue = `%${searchTerm}%`;
        params.push(searchValue, searchValue, searchValue, searchValue);
    }

    // Add skip and limit for pagination
    query += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(userLimit), parseInt(userSkip));

    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


// Function to retrieve product statistics with optional filters
async  getFilteredProductStats(filters) {
    let query = `
        SELECT 
            campaignName,
            adGroupID,
            fsnID,
            productName,
            adSpend,
            views,
            clicks,
            directRevenue,
            indirectRevenue,
            directUnits,
            indirectUnits
        FROM products
        WHERE 1=1`;

    const params = [];

    // Add dynamic filters based on provided input
    if (filters.campaignName) {
        query += " AND campaignName = ?";
        params.push(filters.campaignName);
    }
    
    if (filters.adGroupID) {
        query += " AND adGroupID = ?";
        params.push(filters.adGroupID);
    }

    if (filters.fsnID) {
        query += " AND fsnID = ?";
        params.push(filters.fsnID);
    }

    if (filters.productName) {
        query += " AND productName = ?";
        params.push(filters.productName);
    }
    if (filters.limit) {
        query += " LIMIT ?";
        params.push(filters.limit);  // Limit number of results
    }

    if (filters.skip || filters.skip === 0) { // Allow 0 as a valid skip value
        query += " OFFSET ?";
        params.push(filters.skip);  // Skip the first 'n' results
    }

    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

}

export default new ProductModel(); // Export an instance of the ProductModel
