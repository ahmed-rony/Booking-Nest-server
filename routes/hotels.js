const express = require('express');
const { createHotel, updateHotel, getHotel, deleteHotel, allHotel, countByCity, countByType, getHotelRooms } = require('../controllers/hotel');
const { verifyAdmin } = require('../utilities/verifyToken');
const router = express.Router();

// CREATE
router.post('/', verifyAdmin, createHotel);
// UPDATE
router.put('/:id', verifyAdmin, updateHotel);
// DELETE
router.delete('/:id', verifyAdmin, deleteHotel);
// GET SPECIFICLY
router.get('/find/:id', getHotel);
// GET ALL
router.get('/', allHotel);
// GET BY CITY
router.get('/countByCity', countByCity);
// GET BY TYPE
router.get('/countByType', countByType);
// GET HOTEL AVAILABLE ROOM
router.get('/room/:id', getHotelRooms);


module.exports = router;