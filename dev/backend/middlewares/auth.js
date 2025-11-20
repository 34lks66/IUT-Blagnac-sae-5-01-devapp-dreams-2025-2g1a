const jwt = require("jsonwebtoken");

function authVerif(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    next();
  });
}

function authVerifRole(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Non autorisé" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Non autorisé" });
    }
    if (decoded.role === 'O') {
      return res.status(403).json({ message: "Accès refusé" });
    }
    next();
  });
}


module.exports = authVerif;
module.exports = authVerifRole;