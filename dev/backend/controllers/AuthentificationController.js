// controllers/AuthentificationController.js
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Account = require("../models/AccountModel");
const RefreshToken = require("../models/RefreshTokenModel");
const bcrypt = require("bcrypt");

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
const REFRESH_SECRET =
  process.env.REFRESH_TOKEN_SECRET ||
  (process.env.JWT_SECRET
    ? process.env.JWT_SECRET + "_refresh"
    : "refresh_secret_fallback");

const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "1h";
const REFRESH_EXPIRES_DAYS =
  parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS, 10) || 30;

function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      role: user.statut,
      pays: user.pays,
    },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  );
}

function signRefreshToken(userId, jti) {
  return jwt.sign({ sub: userId.toString(), jti }, REFRESH_SECRET, {
    expiresIn: `${REFRESH_EXPIRES_DAYS}d`,
  });
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Account.findOne({ email });
    if (!account) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const same = await bcrypt.compare(password, account.password);
    if (!same)
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });


    const token = signAccessToken(account);

    // Nouveau : création du refresh token (jti + stockage DB)
    const jti = crypto.randomUUID();
    const refreshToken = signRefreshToken(account._id, jti);
    const expiresAt = new Date(
      Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    );

    await RefreshToken.create({ jti, user: account._id, expiresAt });

    // XSRF token (pour double-submit CSRF protection) - accessible par JS
    const xsrfToken = crypto.randomBytes(16).toString("hex");

    // Cookie access (ton code original mettait token en cookie) — on garde pour retro-compatibilité
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    // Cookie refresh token (HttpOnly)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    });

    // Cookie XSRF (non-httpOnly) pour que le client puisse lire et envoyer en header
    res.cookie("XSRF-TOKEN", xsrfToken, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    });

    // Update connexion ONLY on initial login (not on refresh)
    // Do this synchronously (non-blocking) BEFORE sending response
    if (account && account._id) {
      console.log("login: updating connexion for user", account._id.toString());
      Account.updateOne({ _id: account._id }, { $set: { connexion: new Date() } }).catch((err) =>
        console.error("update connexion error:", err)
      );
    }

    res.json({
      message: "Connexion réussie",
      token,
      account: {
        _id: account._id,
        nom: account.nom,
        prenom: account.prenom,
        email: account.email,
        statut: account.statut,
      },
    });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.refresh = async (req, res) => {
  // CSRF check (double-submit)
  const xsrfCookie = req.cookies["XSRF-TOKEN"];
  const xsrfHeader = req.headers["x-xsrf-token"];
  if (!xsrfCookie || !xsrfHeader || xsrfCookie !== xsrfHeader) {
    return res.status(403).json({ message: "CSRF token missing or invalid" });
  }

  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(401).json({ message: "Refresh token manquant" });

  try {
    const payload = jwt.verify(token, REFRESH_SECRET);
    const { jti, sub: userId } = payload;

    const dbToken = await RefreshToken.findOne({ jti });
    if (!dbToken || dbToken.revoked) {
      return res.status(401).json({ message: "Refresh token invalide" });
    }

    const user = await Account.findById(userId);
    if (!user) {
      // revoke the token if anything odd
      dbToken.revoked = true;
      await dbToken.save();
      return res
        .status(403)
        .json({ message: "Compte désactivé ou introuvable" });
    }

    // rotate: revoke old token and create a new one
    dbToken.revoked = true;
    await dbToken.save();

    const newJti = crypto.randomUUID();
    const newRefreshToken = signRefreshToken(userId, newJti);
    const newExpiresAt = new Date(
      Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    );
    await RefreshToken.create({
      jti: newJti,
      user: userId,
      expiresAt: newExpiresAt,
    });

    const newAccessToken = signAccessToken(user);


    res.cookie("token", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // durée de ton access token en cookie (ici 1h)
    });

    // set new cookies (refresh + new xsrf)
    const newXsrf = crypto.randomBytes(16).toString("hex");
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    });
    res.cookie("XSRF-TOKEN", newXsrf, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
    });

    // on renvoie aussi le nouveau accessToken (au cas où tu en aies besoin côté front plus tard)
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("refresh error", err);
    return res
      .status(401)
      .json({ message: "Refresh token invalide ou expiré" });
  }
};

exports.me = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Non autorisé" });
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    const user = await Account.findById(decoded.sub).select("-password");
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const userObj = user.toObject();
    userObj.role = user.statut;

    res.json({ user: userObj });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { nom, prenom, telephone } = req.body;

    // Get user ID from token/request (auth middleware populates req.user)
    const userId = (req.user && (req.user._id || req.user.sub)) || null;

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const account = await Account.findById(userId);
    if (!account) {
      return res.status(404).json({ message: "Compte introuvable" });
    }

    if (nom) account.nom = nom;
    if (prenom) account.prenom = prenom;
    if (telephone) account.telephone = telephone;

    await account.save();

    res.json({
      message: "Profil mis à jour avec succès",
      user: {
        _id: account._id,
        nom: account.nom,
        prenom: account.prenom,
        telephone: account.telephone,
        email: account.email,
        pays: account.pays,
        role: account.statut
      }
    });

  } catch (error) {
    console.error("updateProfile error", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = jwt.verify(token, REFRESH_SECRET);
      await RefreshToken.findOneAndUpdate(
        { jti: payload.jti },
        { revoked: true }
      );
    } catch (e) {
      // ignore parse errors
    }
  }
  // Clear cookies
  res.clearCookie("refreshToken");
  res.clearCookie("XSRF-TOKEN");
  res.clearCookie("token"); // si tu mets encore token cookie
  res.json({ message: "Déconnexion réussie" });
};

exports.changePassword = async (req, res) => {
  console.log("changePassword called");
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:
          "Champs manquants : currentPassword et newPassword obligatoires",
      });
    }

    // Validation complexité mot de passe
    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre",
      });
    }

    // Récup user dans le token (supporte sub/_id/id)
    const userId = (req.user && (req.user._id || req.user.sub || req.user.id)) || null;

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    // Récup compte
    const account = await Account.findById(userId);
    if (!account) {
      return res.status(404).json({ message: "Compte introuvable" });
    }

    if (!account.password) {
      return res.status(500).json({ message: "Compte sans mot de passe configuré" });
    }

    // Vérification de l'ancien mot de passe
    const same = await bcrypt.compare(currentPassword, account.password);
    if (!same) {
      return res.status(401).json({ message: "Mot de passe actuel incorrect" });
    }

    // Hash du nouveau mot de passe
    const hashed = await bcrypt.hash(newPassword, 10);
    account.password = hashed;

    await account.save();

    // Révoquer tous les refresh tokens existants pour cet utilisateur
    try {
      await RefreshToken.updateMany({ user: account._id }, { revoked: true });
    } catch (e) {
      console.error("error revoking refresh tokens:", e);
    }

    // Nettoyer les cookies d'authentification pour forcer reconnexion
    res.clearCookie("refreshToken");
    res.clearCookie("XSRF-TOKEN");
    res.clearCookie("token");

    return res.json({ message: "Mot de passe mis à jour avec succès" });
  } catch (err) {
    console.error("changePassword error", err);
    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};
