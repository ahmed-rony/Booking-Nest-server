const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();

        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: {rooms: savedRoom._id} })
        } catch (error) {
            next(error)
        }
        res.status(200).send(savedRoom);
    } catch (error) {
        next(error);
    }
}

const updateRoom = async (req, res, next) => {

    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }); // "new" gives th latst updates, otherwise it gives the previous data
        res.status(200).send(updatedRoom);
    } catch (error) {
        next(error);
    }

}
const updateAvailableRoom = async (req, res, next) => {

    try {
        await Room.updateOne({"roomNumbers._id": req.params.id}, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).send("Room Reserved!");
    } catch (error) {
        next(error);
    }

}
const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: {rooms: req.params.id} })
        } catch (error) {
            next(error)
        }
        res.status(200).send('Room Info has been deleted!');
    } catch (error) {
        next(error);
    }
}
const getRoom = async (req, res, next) => {

    try {
        const room = await Room.findById(req.params.id);
        res.status(200).send(room);
    } catch (error) {
        next(error);
    }
}
const allRoom = async (req, res, next) => {

    try {
        const allRooms = await Room.find();
        res.status(200).send(allRooms);
    } catch (error) {
        next(error);
    }
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoom, allRoom, updateAvailableRoom }