const express = require("express");
const {
  login,
  me,
  logout,
  refresh,
  adminDisable
} = require("../controllers/AuthentificationController");

const { authVerif, authVerifRole } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authVerif, me);

module.exports = router;
