// middleware/auth.js
const jwt = require("jsonwebtoken");
const Account = require("../models/AccountModel");

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;

async function authVerif(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ message: "Non autorisé" });

    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.user = decoded; // ex : { sub, email, role, iat, exp }

    // vérifier que l'utilisateur existe et n'est pas désactivé
    // + mettre à jour le rôle depuis la DB (prise en compte immédiate des changements de rôle)
    const user = await Account.findById(decoded._id || decoded.sub);
    if (!user) {
      return res.status(403).json({ message: "Compte désactivé ou introuvable" });
    }

    // Toujours utiliser le rôle actuel de la DB, pas celui du token
    req.user.role = user.statut;
    req.user.statut = user.statut;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
}

// factory middleware pour exiger certains rôles (ex: ['S'] pour super-admin)
function authVerifRole(requiredRoles = ["S"]) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Non autorisé" });
    const role = req.user.role || req.user.statut || req.user.role;
    if (!requiredRoles.includes(role)) {
      return res.status(403).json({ message: "Accès refusé : rôle insuffisant" });
    }
    next();
  };
}

module.exports = { authVerif, authVerifRole };
