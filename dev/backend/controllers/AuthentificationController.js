const jwt = require("jsonwebtoken");
const Account = require("../models/AccountModel");
const bcrypt = require("bcrypt")

const SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Account.findOne({ email });

    if (!account) {
      return res.status(401).json({ message: "Email introuvable" });
    }

    const same = await bcrypt.compare(password, account.password);
    if (!same) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    // if (account.statut === 'O' ) {
    //   return res.status(403).json({ message: "Accès refusé" });
    // }

    const token = jwt.sign(
      { email: account.email, role: account.statut },
      SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, 
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: "Connexion réussie", token, account });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
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

