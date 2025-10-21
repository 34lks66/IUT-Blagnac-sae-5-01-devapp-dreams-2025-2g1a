const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const USERS = [
  { email: "user@test.com", password: "123456", role: "user" },
  { email: "admin@test.com", password: "admin123", role: "admin" },
];
//Temporaire

exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }

  const token = jwt.sign(
    { email: user.email, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false, 
    maxAge: 60 * 60 * 1000,
  });

  res.json({ message: "Connexion réussie" });
};


exports.me = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Non autorisé" });

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnexion réussie" });
};

