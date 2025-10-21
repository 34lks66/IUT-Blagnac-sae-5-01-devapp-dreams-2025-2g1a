const { Router } = require('express')
const { getMembers, saveMember, updateMember, deleteMember } = require('../controllers/MemberController')

const router = Router()

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


module.exports = router 