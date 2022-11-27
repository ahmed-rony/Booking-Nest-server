const User = require("../models/User");

const updateUser = async (req, res, next) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }); // "new" gives th latst updates, otherwise it gives the previous data
        res.status(200).send(updatedUser);
    } catch (error) {
        next(error);
    }

}
const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send('User has been deleted!');
    } catch (error) {
        next(error);
    }
}
const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}
const allUser = async (req, res, next) => {
    // const failed = true;
    // if(failed) return next(createError(401, "You are not authenticated!"));

    try {
        const allUsers = await User.find();
        res.status(200).send(allUsers);
    } catch (error) {
        next(error);
    }
}

module.exports = { updateUser, deleteUser, getUser, allUser };