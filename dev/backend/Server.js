const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const fs = require('fs');
const path = require('path');

const routes = require('./routes/MemberRoute');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.json({ 
        message: 'Server is running!',
        routes: {
            getMembers: 'GET /api/get',
            saveMember: 'POST /api/save',
            updateMember: 'PUT /api/update/:id',
            deleteMember: 'DELETE /api/delete/:id'
        }
    });
});

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

 app.get('/api-docs-redoc', (req, res) => {
   res.send(`
     <!DOCTYPE html>
     <html>
       <head>
         <title>API Documentation - ReDoc</title>
         <meta charset="utf-8"/>
         <style>
           body { margin: 0; padding: 0; background-color: #0f0f0f; }
        .menu-content {
            border-right: 1px solid #a0a0a0 !important;
        }
         </style>
       </head>
       <body>
        <div id="redoc-container"></div>
         <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
         <script>
          Redoc.init('/swagger.json', {
            theme: {
              colors: {
                text: {
                  primary: '#ffffff',
                  secondary: '#d1d5db' 
                },
                background: {
                  main: '#0f0f0f',
                  paper: '#1a1a1a'
                }
              },
              sidebar: {
                backgroundColor: '#0f0f0f',
                textColor: '#ffffff',
                width: '260px',
                hover: {
                  backgroundColor: '#d6d9da'
                }
              },
              rightPanel: {
                backgroundColor: '#0f0f0f'
              }
            },
            pathInMiddlePanel: true,
            hideDownloadButton: true,
            expandSingleSchemaField: true
          }, document.getElementById('redoc-container'));
        </script>
       </body>
     </html>
   `);
 });

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));