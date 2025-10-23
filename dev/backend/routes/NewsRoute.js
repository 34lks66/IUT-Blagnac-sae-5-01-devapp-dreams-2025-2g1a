const { Router } = require('express')
const { getNews, saveNews, updateNews, deleteNews } = require('../controllers/NewsController')

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
router.post('/news/save', upload.single('image'), saveNews)

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
router.put('/news/update/:id', upload.single('image'), updateNews)

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
router.delete('/news/delete/:id', deleteNews)


module.exports = router 