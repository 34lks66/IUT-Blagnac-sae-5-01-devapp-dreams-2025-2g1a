require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const fs = require('fs');
const path = require('path');

const Routes = require('./routes/Route');
const authRoutes = require('./routes/AuthentificationRoute');
const accountRoutes = require('./routes/AccountRoute');
const cookieParser = require("cookie-parser"); 
const authVerif = require("./middlewares/auth");
const { events } = require("./models/MemberModel");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true, 
  })
);

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.json({ 
        message: 'Server is running!',
        routes: {
          members: {
            getMembers: 'GET /api/get',
            saveMember: 'POST /api/save',
            updateMember: 'PUT /api/update/:id',
            deleteMember: 'DELETE /api/delete/:id'
          },
          news: {
            getNews: 'GET /api/news/get',
            saveNews: 'POST /api/news/save',
            updateNews: 'PUT /api/news/update/:id',
            deleteNews: 'DELETE /api/news/delete/:id'
          },
          pays: {
            getPays: 'GET /api/pays/get',
            savePays: 'POST /api/pays/save',
            updatePays: 'PUT /api/pays/update/:id',
            deletePays: 'DELETE /api/pays/delete/:id'
          },
          antennes: {
            getAntennes: 'GET /api/antenne/get',
            saveAntenne: 'POST /api/antenne/save',
            updateAntenne: 'PUT /api/antenne/update/:id',
            deleteAntenne: 'DELETE /api/antenne/delete/:id'
          },
          events: {
            getEvent: 'GET /api/event/get',
            saveEvent: 'POST /api/event/save',
            updateEvent: 'PUT /api/event/update/:id',
            deleteEvent: 'DELETE /api/event/delete/:id'
          }
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

app.use('/api', Routes);
app.use('/api', authRoutes);
app.use('/api/accounts', authVerif, accountRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
