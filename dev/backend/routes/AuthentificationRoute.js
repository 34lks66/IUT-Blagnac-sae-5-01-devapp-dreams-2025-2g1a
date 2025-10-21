const express = require("express");
const { login, me, logout } = require("../controllers/AuthentificationController");

const router = express.Router();

router.post("/login", login);
router.get("/me", me);
router.post("/logout", logout);

module.exports = router;
