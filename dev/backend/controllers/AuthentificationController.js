// controllers/AuthentificationController.js
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Account = require("../models/AccountModel");
const RefreshToken = require("../models/RefreshTokenModel");
const bcrypt = require("bcrypt");

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || (process.env.JWT_SECRET ? process.env.JWT_SECRET + "_refresh" : "refresh_secret_fallback");

const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "1h";
const REFRESH_EXPIRES_DAYS = parseInt(process.env.REFRESH_TOKEN_EXPIRES_DAYS, 10) || 30;

function signAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.statut, pays: user.pays },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  );
}

function signRefreshToken(userId, jti) {
  return jwt.sign(
    { sub: userId.toString(), jti },
    REFRESH_SECRET,
    { expiresIn: `${REFRESH_EXPIRES_DAYS}d` }
  );
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Account.findOne({ email });
    if (!account) return res.status(401).json({ message: "Email introuvable" });

    const same = await bcrypt.compare(password, account.password);
    if (!same) return res.status(401).json({ message: "Mot de passe incorrect" });


    const token = signAccessToken(account);

    // Nouveau : création du refresh token (jti + stockage DB)
    const jti = crypto.randomUUID();
    const refreshToken = signRefreshToken(account._id, jti);
    const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);

    await RefreshToken.create({ jti, user: account._id, expiresAt });

    // XSRF token (pour double-submit CSRF protection) - accessible par JS
    const xsrfToken = crypto.randomBytes(16).toString('hex');

    // Cookie access (ton code original mettait token en cookie) — on garde pour retro-compatibilité
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    });

    // Cookie refresh token (HttpOnly)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === 'production',
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    });

    // Cookie XSRF (non-httpOnly) pour que le client puisse lire et envoyer en header
    res.cookie("XSRF-TOKEN", xsrfToken, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === 'production',
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Connexion réussie",
      token,
      account: {
        _id: account._id,
        nom: account.nom,
        prenom: account.prenom,
        email: account.email,
        statut: account.statut
      }
    });
  } catch (err) {
    console.error("login error", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.refresh = async (req, res) => {
  // CSRF check (double-submit)
  const xsrfCookie = req.cookies['XSRF-TOKEN'];
  const xsrfHeader = req.headers['x-xsrf-token'];
  if (!xsrfCookie || !xsrfHeader || xsrfCookie !== xsrfHeader) {
    return res.status(403).json({ message: "CSRF token missing or invalid" });
  }

  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "Refresh token manquant" });

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
      return res.status(403).json({ message: "Compte désactivé ou introuvable" });
    }

    // rotate: revoke old token and create a new one
    dbToken.revoked = true;
    await dbToken.save();

    const newJti = crypto.randomUUID();
    const newRefreshToken = signRefreshToken(userId, newJti);
    const newExpiresAt = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
    await RefreshToken.create({ jti: newJti, user: userId, expiresAt: newExpiresAt });

    const newAccessToken = signAccessToken(user);


    res.cookie("token", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000, // durée de ton access token en cookie (ici 1h)
    });

    // set new cookies (refresh + new xsrf)
    const newXsrf = crypto.randomBytes(16).toString('hex');
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === 'production',
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    });
    res.cookie("XSRF-TOKEN", newXsrf, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === 'production',
      maxAge: REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
    });

    // on renvoie aussi le nouveau accessToken (au cas où tu en aies besoin côté front plus tard)
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("refresh error", err);
    return res.status(401).json({ message: "Refresh token invalide ou expiré" });
  }
};

exports.me = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Non autorisé" });
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    res.json({ user: decoded });
  } catch {
    res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = jwt.verify(token, REFRESH_SECRET);
      await RefreshToken.findOneAndUpdate({ jti: payload.jti }, { revoked: true });
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
