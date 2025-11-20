const { Router } = require('express')
const { getMembers, saveMember, updateMember, deleteMember } = require('../controllers/MemberController')
const { getPays, savePays, updatePays, deletePays } = require('../controllers/PaysController')
const { getNewsPays, getNewsPaysID, saveNewsPays, updateNewsPays, deleteNewsPays } = require('../controllers/NewsPaysController')
const { getAntennes, saveAntenne, updateAntenne, deleteAntenne } = require('../controllers/AntenneController')
const { getNews, getNewsID, saveNews, updateNews, deleteNews } = require('../controllers/NewsController')
const { listEvents, getEvent, saveEvent, updateEvent, deleteEvent } = require('../controllers/EventController');

const router = Router()
const { authVerif, authVerifRole } = require("../middlewares/auth");

const multer = require('multer')
const path = require('path')

const uploadDir = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage })

//////////////////////////////////////////////////////////////////
///////////////////////// MEMBERS ////////////////////////////////
//////////////////////////////////////////////////////////////////

// router.get('/', getMembers) 

/**
 * @openapi
 * /api/members/get:
 *   get:
 *     summary: /api/members/get
 *     responses:
 *       200:
 *         description: Liste des membres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get('/get',authVerif,authVerifRole(["X", "S"]), getMembers)

/**
 * @openapi
 * /api/members/save:
 *   post:
 *     summary: /api/members/save
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/save',authVerif,authVerifRole(["X", "S"]), saveMember)

/**
 * @openapi
 * /api/members/update/{id}:
 *   put:
 *     summary: /api/members/update/{id}
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
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/update/:id',authVerif,authVerifRole(["X", "S"]), updateMember)

/**
 * @openapi
 * /api/members/delete/{id}:
 *   delete:
 *     summary: /api/members/delete/{id}
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete('/delete/:id',authVerif, authVerifRole(["X", "S"]), deleteMember)

//////////////////////////////////////////////////////////////////
///////////////////////// Pays // ////////////////////////////////
//////////////////////////////////////////////////////////////////

router.get('/pays/get', getPays);
router.post('/pays/save',authVerif,authVerifRole(["X", "S"]), upload.single('image'), savePays)
router.put('/pays/update/:id',authVerif,authVerifRole(["X", "S"]), upload.single('image'), updatePays)
router.delete('/pays/delete/:id',authVerif,authVerifRole(["X", "S"]), deletePays)


//////////////////////////////////////////////////////////////////
///////////////////////// NewsPays ///////////////////////////////
//////////////////////////////////////////////////////////////////

router.get('/newspays/get', getNewsPays)
router.get('/newspays/get/:id', getNewsPaysID)
router.post('/newspays/save',authVerif,authVerifRole(["X", "S"]), upload.single('image'), saveNewsPays)
router.put('/newspays/update/:id',authVerif,authVerifRole(["X", "S"]), upload.single('image'), updateNewsPays)
router.delete('/newspays/delete/:id',authVerif,authVerifRole(["X", "S"]), deleteNewsPays)

//////////////////////////////////////////////////////////////////
///////////////////////// Antenne ////////////////////////////////
//////////////////////////////////////////////////////////////////

router.get('/antenne/get', getAntennes)
router.post('/antenne/save',authVerif,authVerifRole(["X", "S"]), upload.single('image'), saveAntenne)
router.put('/antenne/update/:id',authVerif,authVerifRole(["X", "S"]), upload.single('image'), updateAntenne)
router.delete('/antenne/delete/:id',authVerif,authVerifRole(["X", "S"]), deleteAntenne)

//////////////////////////////////////////////////////////////////
//////////////////////////// News ////////////////////////////////
//////////////////////////////////////////////////////////////////
/**
 * @openapi
 * /api/news/get:
 *   get:
 *     summary: /api/news/get
 *     responses:
 *       200:
 *         description: Liste des actualités
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */
router.get('/news/get', getNews)
router.get('/news/get/:id', getNewsID)

/**
 * @openapi
 * /api/news/save:
 *   post:
 *     summary: /api/news/save
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/news/save', authVerif,authVerifRole(["X", "S"]), upload.single('image'), saveNews)

/**
 * @openapi
 * /api/news/update/{id}:
 *   put:
 *     summary: /api/news/update/{id}
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
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/news/update/:id', authVerif,authVerifRole(["X", "S"]), upload.single('image'), updateNews)

/**
 * @openapi
 * /api/news/delete/{id}:
 *   delete:
 *     summary: /api/news/delete/{id}
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete('/news/delete/:id', authVerif,authVerifRole(["X", "S"]), deleteNews)

//////////////////////////////////////////////////////////////////
/////////////////////////// Event ////////////////////////////////
//////////////////////////////////////////////////////////////////

/**
 * @openapi
 * /api/event/get:
 *   get:
 *     summary: /api/event/get 
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
router.get('/event/get', listEvents);

/**
 * @openapi
 * /api/event/get/{id}:
 *   get:
 *     summary: api/event/get/{id}
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
router.get('/event/get/:id', getEvent);

/**
 * @openapi
 * /api/event/save:
 *   post:
 *     summary: /api/event/save
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
router.post('/event/save',authVerif,authVerifRole(["X", "S"]), saveEvent);

/**
 * @openapi
 * /api/event/update/{id}:
 *   put:
 *     summary: /api/event/update/{id}
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
router.put('/event/update/:id',authVerif,authVerifRole(["X", "S"]), updateEvent);

/**
 * @openapi
 * /api/event/delete/{id}:
 *   delete:
 *     summary: /api/event/delete/{id}
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
router.delete('/event/delete/:id',authVerif,authVerifRole(["X", "S"]), deleteEvent);

module.exports = router 