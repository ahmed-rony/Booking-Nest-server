const express = require('express');
const { updateUser, deleteUser, getUser, allUser } = require('../controllers/user');
const { verifyUser, verifyAdmin } = require('../utilities/verifyToken');
const router = express.Router();

// router.get('/checkAuthentication', verifyToken, (req, res, next) => {
//     res.send('logged in')
// })
// router.get('/checkUser/:id', verifyUser, (req, res, next) => {
//     res.send('User logged in and can delete your account')
// })
// router.get('/checkAdmin/:id', verifyAdmin, (req, res, next) => {
//     res.send('Admin logged in and can delete all account')
// })

// UPDATE
router.put('/:id', verifyUser, updateUser)
// DELETE
router.delete('/:id', verifyUser, deleteUser)
// GET SPECIFICLY
router.get('/:id', verifyUser, getUser)
// GET ALL
router.get('/', verifyAdmin, allUser)

module.exports = router;