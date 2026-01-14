const express = require("express");
const {
  login,
  me,
  logout,
  refresh,
  adminDisable,
  changePassword,
  updateProfile
} = require("../controllers/AuthentificationController");

const { authVerif, authVerifRole } = require("../middlewares/auth");

const router = express.Router();

router.put("/change-password", authVerif, changePassword);
router.put("/update-profile", authVerif, updateProfile);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authVerif, me);

module.exports = router;
