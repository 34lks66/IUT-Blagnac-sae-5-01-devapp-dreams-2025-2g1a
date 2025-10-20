const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API DREAMS',
            version: '1.0.0',
            description: 'Documentation auto-générée avec swagger-jsdoc',
        },
        servers: [
            { url: 'http://localhost:5000', description: 'Local server' }
        ],
        components: {
            schemas: {
                Member: {
                    type: 'object',
                    properties: {
                        texte: { type: 'string', example: 'hello world'},
                    },
                },
            },
        },
    },

    apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;