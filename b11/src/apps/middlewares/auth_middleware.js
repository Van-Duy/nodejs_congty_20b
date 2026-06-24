var jwt = require('jsonwebtoken');

const { findById } = require("../../services/user.services")

const checkLogin = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        const arrDataToken = bearerToken.split(" ")
        const token = arrDataToken[1]

        var decoded = jwt.verify(token, process.env.privateKey);
        req.userId = decoded.id
        next()

    } catch (error) {
        return res.status(401).json({
            message: "Not Login"
        })
    }
}
const checkPermission = async (req, res, next) => {
    try {
        let user = await findById(req.userId)
        if (user.role == "admin") {
            next()
        } else {
            return res.status(403).json({
                message: "Not Permission"
            })
        }
    } catch (error) {
        return res.status(403).json({
            message: "Not Permission"
        })
    }
}


module.exports = { checkLogin, checkPermission }