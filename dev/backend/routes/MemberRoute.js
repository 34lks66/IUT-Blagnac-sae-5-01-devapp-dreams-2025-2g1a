const { Router } = require('express')
const { getMembers, saveMember, updateMember, deleteMember } = require('../controllers/MemberController')

const router = Router()

// router.get('/', getMembers) 
router.get('/get', getMembers)
router.post('/save', saveMember)
router.put('/update/:id', updateMember)
router.delete('/delete/:id', deleteMember)



module.exports = router 