const Hotel = require("../models/Hotel");

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save();
        res.status(200).send(savedHotel);
    } catch (error) {
        next(error);
    }
}
const updateHotel = async (req, res, next) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }); // "new" gives th latst updates, otherwise it gives the previous data
        res.status(200).send(updatedHotel);
    } catch (error) {
        next(error);
    }

}
const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).send('Hotel Info has been deleted!');
    } catch (error) {
        next(error);
    }
}
const getHotel = async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).send(hotel);
    } catch (error) {
        next(error);
    }
}
const allHotel = async (req, res, next) => {
    // const failed = true;
    // if(failed) return next(createError(401, "You are not authenticated!"));

    try {
        const allHotels = await Hotel.find(req.query);
        res.status(200).send(allHotels);
    } catch (error) {
        next(error);
    }
}
const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(','); // it makes it like an array bt comma ","

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })  // Hotel.find({city:city}).length => it grabes all data, proprties thn it gives a length, but the used one is more faster & proper one;
        }))
        res.status(200).send(list);
    } catch (error) {
        next(error);
    }
}
const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })

        res.status(200).send([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: apartmentCount},
            {type: "resort", count: resortCount},
            {type: "villa", count: villaCount},
            {type: "cabin", count: cabinCount},
        ]);
    } catch (error) {
        next(error);
    }
}

module.exports = { createHotel, updateHotel, deleteHotel, getHotel, allHotel, countByCity, countByType };