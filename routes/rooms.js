const express = require('express');
const { createRoom, updateRoom, deleteRoom, getRoom, allRoom, updateAvailableRoom } = require('../controllers/room');
const { verifyAdmin } = require('../utilities/verifyToken');
const router = express.Router();

// CREATE
router.post('/:hotelId', verifyAdmin, createRoom)
// UPDATE
router.put('/:id', verifyAdmin, updateRoom)
// UPDATE ROOM AVAILABILITY
router.put('/availability/:id', updateAvailableRoom)
// DELETEs
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)
// GET SPECIFICLY
router.get('/:id', getRoom)
// GET ALL
router.get('/', allRoom)

module.exports = router;