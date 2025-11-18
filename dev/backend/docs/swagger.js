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
                        _id: { type: 'string', description: "Identifiant unique généré par MongoDB", example: '673b51b0c25e5c1234567890' },
                        image: { type: 'string', example: '/uploads/image123.jpg' },
                        title: { type: 'string', example: 'Nouvelle actu' },
                        date: { type: 'string', example: '23 octobre' },
                        link: { type: 'string', example: 'href' },
                    }
                },
                Event: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', description: "Identifiant unique généré par MongoDB", example: '673b51b0c25e5c1234567890' },
                        title: { type: 'string', example: 'New event' },
                        date: { type: 'string', example: '25 novembre' },
                        time: { type: 'string', example: '18:30' },
                        location: { type: 'string', example: '2 place Simon, Toulouse' },
                        description: { type: 'string', example: 'Réunion présentation du site DREAMS' },
                        antenna: { type: 'string', example: '673b5201a97bcd1234567890' },
                        antennaName: { type: 'string', example: 'Toulouse' },
                        isGeneral: { type: 'boolean', example: false }
                    }
                },
            },
        },
    },

    apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;