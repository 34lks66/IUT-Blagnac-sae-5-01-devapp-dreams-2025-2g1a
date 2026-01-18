const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authVerif } = require("../middlewares/auth");
const {
  uploadPolePdfs,
  getPolePdfs,
  deletePolePdf,
} = require("../controllers/PolePdfController");

// Configuration de multer pour gérer l'upload en mémoire
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB max
});

// Routes
router.post("/upload-pole-pdfs/:pole", authVerif, upload.array("pdfs"), uploadPolePdfs);
router.get("/pole-pdfs/:pole", authVerif, getPolePdfs);
router.delete("/delete-pole-pdf/:pole", authVerif, deletePolePdf);

module.exports = router;
