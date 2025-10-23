const { Router } = require('express')
const { getMembers, saveMember, updateMember, deleteMember } = require('../controllers/MemberController')
const { getPays, savePays, updatePays, deletePays } = require('../controllers/PaysController')
const { getNewsPays, saveNewsPays, updateNewsPays, deleteNewsPays } = require('../controllers/NewsPaysController')
const { getAntennes, saveAntenne, updateAntenne, deleteAntenne } = require('../controllers/AntenneController')
const router = Router()

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
router.get('/get', getMembers)
router.get('/pays/get', getPays);
router.get('/newspays/get', getNewsPays)
router.get('/antenne/get', getAntennes)


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
router.post('/save', saveMember)
router.post('/pays/save', upload.single('image'), savePays)
router.post('/newspays/save', upload.single('image'), saveNewsPays)
router.post('/antenne/save', saveAntenne)


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
router.put('/update/:id', updateMember)
router.put('/pays/update/:id', upload.single('image'), updatePays)
router.put('/newspays/update/:id', upload.single('image'), updateNewsPays)
router.put('/antenne/update/:id', updateAntenne)


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
router.delete('/delete/:id', deleteMember)
router.delete('/pays/delete/:id', deletePays)
router.delete('/newspays/delete/:id', deleteNewsPays)
router.delete('/antenne/delete/:id', deleteAntenne)



module.exports = router 