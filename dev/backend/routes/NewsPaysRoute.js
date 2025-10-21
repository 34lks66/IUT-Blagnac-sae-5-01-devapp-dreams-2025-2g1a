const { Router } = require("express");
const {
  getNewsPays,
  getOneNewsPays,
  createNewsPays,
  updateNewsPays,
  deleteNewsPays,
} = require("../controllers/NewsPaysController");

const router = Router();

/**
 * @openapi
 * /api/news-pays/get:
 *   get:
 *     summary: Liste toutes les actualités (option ?pays=id pour filtrer)
 *     parameters:
 *       - in: query
 *         name: pays
 *         schema:
 *           type: string
 *         description: ID du pays à filtrer
 *     responses:
 *       200:
 *         description: Liste des actualités
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NewsPays'
 */
router.get("/get", getNewsPays);

/**
 * @openapi
 * /api/news-pays/get/{id}:
 *   get:
 *     summary: Récupérer une actualité spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Actualité trouvée
 */
router.get("/get/:id", getOneNewsPays);

/**
 * @openapi
 * /api/news-pays/save:
 *   post:
 *     summary: Créer une nouvelle actualité liée à un pays
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsPays'
 *     responses:
 *       201:
 *         description: Actualité créée avec succès
 */
router.post("/save", createNewsPays);

/**
 * @openapi
 * /api/news-pays/update/{id}:
 *   put:
 *     summary: Mettre à jour une actualité
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
 *             $ref: '#/components/schemas/NewsPays'
 *     responses:
 *       200:
 *         description: Actualité mise à jour
 */
router.put("/update/:id", updateNewsPays);

/**
 * @openapi
 * /api/news-pays/delete/{id}:
 *   delete:
 *     summary: Supprimer une actualité
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Actualité supprimée
 */
router.delete("/delete/:id", deleteNewsPays);

module.exports = router;
