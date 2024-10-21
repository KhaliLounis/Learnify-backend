// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Learning Management System API',
      version: '1.0.0',
      description: 'API documentation for the Learning Management System',
    },
    servers: [
      {
        url: 'http://localhost:5000/api', // Your server URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional: specify JWT format
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Apply the BearerAuth security scheme globally
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files (you can adjust this to match your project structure)
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
