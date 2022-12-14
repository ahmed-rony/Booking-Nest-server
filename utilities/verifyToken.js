const createError = require("../utilities/error");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) { return next(createError(401, "Token is not valid!")) }
        req.user = user;
        next();
    })
}
// verify the owner of thee account & admin
const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            if (err) { return next(createError(401, "You are not authorized!")) }
        }
    })
}
// verify the admin only
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            if (err) { return next(createError(401, "You are not authorized!")) }
        }
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin };