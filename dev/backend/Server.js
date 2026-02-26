require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// Sanitization NoSQL manuelle (compatible Express 5 où req.query est read-only)
function sanitizeValue(val) {
  if (typeof val === 'string') return val;
  if (val === null || val === undefined) return val;
  if (Array.isArray(val)) return val.map(sanitizeValue);
  if (typeof val === 'object') {
    const clean = {};
    for (const key of Object.keys(val)) {
      if (key.startsWith('$')) continue; // supprime les opérateurs MongoDB
      clean[key] = sanitizeValue(val[key]);
    }
    return clean;
  }
  return val;
}
function mongoSanitize(req, _res, next) {
  if (req.body) req.body = sanitizeValue(req.body);
  if (req.params) req.params = sanitizeValue(req.params);
  next();
}
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const fs = require('fs');
const path = require('path');

// Créer les répertoires s'ils n'existent pas
const uploadsDir = path.join(__dirname, 'uploads');
const pdfDir = path.join(__dirname, 'pdf');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Répertoire uploads créé');
}

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
  console.log('Répertoire pdf créé');
}

const Routes = require('./routes/Route');
const authRoutes = require('./routes/AuthentificationRoute');
const accountRoutes = require('./routes/AccountRoute');
const polePdfRoutes = require('./routes/PolePdfRoute');
const cookieParser = require("cookie-parser");
const { authVerif, authVerifRole } = require("./middlewares/auth");
const { events } = require("./models/MemberModel");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Security middleware ---
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // permet au frontend de charger les images
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(mongoSanitize);

// CORS: utiliser CORS_ORIGINS depuis .env (séparé par des virgules)
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map(o => o.trim());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Rate limiting sur les routes d'authentification
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 tentatives max par IP
  message: { message: "Trop de tentatives de connexion, réessayez dans 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Documentation API : protégée en production
const serveRedoc = (req, res) => {
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
};

const serveSwaggerJson = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
};

if (process.env.NODE_ENV !== 'production') {
  app.get('/swagger.json', serveSwaggerJson);
  app.get('/api-docs-redoc', serveRedoc);
} else {
  app.get('/swagger.json', authVerif, authVerifRole(["S"]), serveSwaggerJson);
  app.get('/api-docs-redoc', authVerif, authVerifRole(["S"]), serveRedoc);
}


app.use('/api', Routes);
app.post('/api/login', loginLimiter); // Rate limit uniquement sur login
app.use('/api', authRoutes);
app.use('/api', polePdfRoutes);
app.use('/api/accounts', authVerif, authVerifRole(["X", "S"]), accountRoutes);

// Swagger/ReDoc : accessible uniquement en dev ou pour les admins
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
} else {
  app.use('/api-docs', authVerif, authVerifRole(["S"]), swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Images publiques (utilisées par le site public site_dreams)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// PDFs protégés (documents internes)
app.use('/pdf', authVerif, express.static(path.join(__dirname, 'pdf')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));