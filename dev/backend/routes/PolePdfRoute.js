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

// Routes avec structure /pays/pole
router.post("/upload-pole-pdfs/:pays/:pole", authVerif, upload.array("pdfs"), uploadPolePdfs);
router.get("/pole-pdfs/:pays/:pole", authVerif, getPolePdfs);
router.delete("/delete-pole-pdf/:pays/:pole", authVerif, deletePolePdf);

module.exports = router;
