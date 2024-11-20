import swaggerAutogen from 'swagger-autogen';

const swagger = swaggerAutogen();

const doc = {
    info: {
        version: '1.0', // by default: "1.0.0"
        title: 'E-commerce Campaign Reporting', // by default: "REST API"
        description: 'Documentation for E-commerce API', // by default: ""
    },
    host: process.env.PORT||"localhost:3001", // by default: "localhost:3007"
    basePath: '/', // by default: "/"
    schemes: ['http', 'https'], // by default: ['http']
    consumes: ['application/json', 'application/x-www-form-urlencoded'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Auth',
            description: 'Auth Endpoint(s)',
            summary: 'Open',
        },
        {
            name: 'User',
            description: 'User Endpoint(s)',
            summary: 'Secure',
        },
        {
            name: 'Product',
            description: 'Product report upload Endpoint(s)',
            summary: 'Secure',
        },
        {
            name: 'Product-Filter',
            description: 'Product report filter Endpoint(s)',
            summary: 'Secure',
        },
    ],
    securityDefinitions: {
        AccessToken: {
            type: 'apiKey',
            in: 'header',
            name: 'x-access-token',
            description:
                'Please provide the valid access token. If you don’t have one, please log in to get the token as a response.',
        },
    },
    security: [
        {
            AccessToken: [], // Use this on the routes that require the token
        },
    ],
    definitions: {
        userDetails: {
            username: '@user123',
            email: 'useronetoone@gmail.com',
            password: 'user$12&one',
        },
        userLoginDetails: {
            username: '@user123',
            password: 'user$12&one',
        },
    },
};

const outputFile = './view/swagger-api-view.json';
const endpointsFiles = ['./app.js']; 

// Use an async function to call swagger-autogen
(async () => {
    try {
        await swagger(outputFile, endpointsFiles, doc);
        console.log('Swagger file generated successfully.');
    } catch (error) {
        console.error('Error generating Swagger file:', error.message);
    }
})();
