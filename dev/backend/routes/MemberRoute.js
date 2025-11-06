const { Router } = require('express')
const { getMembers, saveMember, updateMember, deleteMember } = require('../controllers/MemberController')
const { getPays, savePays, updatePays, deletePays } = require('../controllers/PaysController')
const { getNewsPays, saveNewsPays, updateNewsPays, deleteNewsPays } = require('../controllers/NewsPaysController')
const { getAntennes, saveAntenne, updateAntenne, deleteAntenne } = require('../controllers/AntenneController')
const router = Router()
const authVerif = require("../middlewares/auth");

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
router.get('/get',authVerif, getMembers)

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
router.post('/save',authVerif, saveMember)

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
router.put('/update/:id',authVerif, updateMember)

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
router.delete('/delete/:id',authVerif, deleteMember)

//////////////////////////////////////////////////////////////////
///////////////////////// Pays // ////////////////////////////////
//////////////////////////////////////////////////////////////////

router.get('/pays/get', getPays);
router.post('/pays/save',authVerif, upload.single('image'), savePays)
router.put('/pays/update/:id',authVerif, upload.single('image'), updatePays)
router.delete('/pays/delete/:id',authVerif, deletePays)


//////////////////////////////////////////////////////////////////
///////////////////////// NewsPays ///////////////////////////////
//////////////////////////////////////////////////////////////////

router.get('/newspays/get', getNewsPays)
router.post('/newspays/save',authVerif, upload.single('image'), saveNewsPays)
router.put('/newspays/update/:id',authVerif, upload.single('image'), updateNewsPays)
router.delete('/newspays/delete/:id',authVerif, deleteNewsPays)

//////////////////////////////////////////////////////////////////
///////////////////////// Antenne ////////////////////////////////
//////////////////////////////////////////////////////////////////

router.get('/antenne/get', getAntennes)
<<<<<<< HEAD
router.post('/antenne/save', upload.single('image'), saveAntenne)
router.put('/antenne/update/:id', upload.single('image'), updateAntenne)
router.delete('/antenne/delete/:id', deleteAntenne)
=======
router.post('/antenne/save',authVerif, saveAntenne)
router.put('/antenne/update/:id',authVerif, updateAntenne)
router.delete('/antenne/delete/:id',authVerif, deleteAntenne)
>>>>>>> main


module.exports = router 