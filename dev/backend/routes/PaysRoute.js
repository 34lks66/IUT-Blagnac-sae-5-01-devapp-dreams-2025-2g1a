const { Router } = require("express");
const {
  getPays,
  getOnePays,
  createPays,
  updatePays,
  deletePays,
} = require("../controllers/PaysController");

const router = Router();

/**
 * @openapi
 * /api/pays/get:
 *   get:
 *     summary: Récupérer la liste de tous les pays
 *     responses:
 *       200:
 *         description: Liste des pays
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pays'
 */
router.get("/get", getPays);

/**
 * @openapi
 * /api/pays/get/{id}:
 *   get:
 *     summary: Récupérer un pays par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du pays
 */
router.get("/get/:id", getOnePays);

/**
 * @openapi
 * /api/pays/save:
 *   post:
 *     summary: Créer un nouveau pays
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pays'
 *     responses:
 *       201:
 *         description: Pays créé avec succès
 */
router.post("/save", createPays);

/**
 * @openapi
 * /api/pays/update/{id}:
 *   put:
 *     summary: Mettre à jour un pays existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pays'
 *     responses:
 *       200:
 *         description: Pays mis à jour
 */
router.put("/update/:id", updatePays);

/**
 * @openapi
 * /api/pays/delete/{id}:
 *   delete:
 *     summary: Supprimer un pays (et ses actualités associées)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pays supprimé
 */
router.delete("/delete/:id", deletePays);

module.exports = router;
