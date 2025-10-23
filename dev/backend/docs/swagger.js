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
                News: {
                    type: 'object',
                    properties: {
                        image: { type: 'string', example: '/uploads/image123.jpg' },
                        title: { type: 'string', example: 'Nouvelle actu' },
                        date: { type: 'string', example: '23 octobre' },
                        link: { type: 'string', example: 'href' },
                    }
                },
            },
        },
    },

    apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;