const User = require("../models/User");
const bcrypt = require('bcryptjs');
const createError = require("../utilities/error");
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword // to encode the password, that's why didn't write only "req.body";
    });

    try {
        await newUser.save();
        res.status(200).send("User has been created!")
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        // CHECK USER
        const user = await User.findOne({ username: req.body.username });
        if (!user) { next(createError(404, "User not found!")) };
        // CHECK PASSWORD
        const passwordCheck = await bcrypt.compareSync(req.body.password, user.password);
        if (!passwordCheck) { next(createError(400, "Wrong password or username!")) }
        else {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
            const { password, isAdmin, ...others } = user._doc;
            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).send({ ...others });
        }

    } catch (error) {
        next(error);
    }
}

module.exports = { register, login };