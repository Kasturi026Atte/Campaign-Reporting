import app from './app.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const PORT = process.env.PORT || 3001;

// Load Swagger JSON file
let swaggerFile;
try {
  swaggerFile = JSON.parse(fs.readFileSync('./view/swagger-api-view.json', 'utf-8'));
} catch (error) {
  console.error('Failed to load Swagger JSON file:', error.message);
  process.exit(1); // Exit the application if the file can't be loaded
}

// Serve Swagger UI
app.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get('/', (req, res) => res.redirect('/explorer'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
