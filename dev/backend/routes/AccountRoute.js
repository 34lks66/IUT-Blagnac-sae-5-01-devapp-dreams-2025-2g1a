const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { authVerif } = require("../middlewares/auth");
const {
  getAccounts,
  saveAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/AccountController");

router.get("/", getAccounts);
router.post("/", saveAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);


module.exports = router;
