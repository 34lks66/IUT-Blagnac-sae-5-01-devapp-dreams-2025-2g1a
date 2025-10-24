const { Router } = require('express');
const { 
  listEvents, 
  getEvent, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/EventController');

const router = Router();

/**
 * @openapi
 * /api/events/list:
 *   get:
 *     summary: Liste tous les événements (généraux ou d'une antenne)
 *     parameters:
 *       - in: query
 *         name: general
 *         schema:
 *           type: boolean
 *         description: Filtrer les événements généraux (true/false)
 *       - in: query
 *         name: antenna
 *         schema:
 *           type: string
 *         description: Filtrer par antenne spécifique
 *     responses:
 *       200:
 *         description: Liste des événements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/', listEvents);

/**
 * @openapi
 * /api/events/get/{id}:
 *   get:
 *     summary: Récupère un événement par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'événement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Événement introuvable
 */
router.get('/:id', getEvent);

/**
 * @openapi
 * /api/events/create:
 *   post:
 *     summary: Crée un nouvel événement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Événement créé avec succès
 *       400:
 *         description: Champs requis manquants
 */
router.post('/', createEvent);

/**
 * @openapi
 * /api/events/update/{id}:
 *   put:
 *     summary: Met à jour un événement existant
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
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Événement mis à jour
 *       404:
 *         description: Événement introuvable
 */
router.put('/:id', updateEvent);

/**
 * @openapi
 * /api/events/delete/{id}:
 *   delete:
 *     summary: Supprime un événement par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Événement supprimé avec succès
 *       404:
 *         description: Événement introuvable
 */
router.delete('/:id', deleteEvent);

module.exports = router;
