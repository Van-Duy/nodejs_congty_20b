
const { findAll } = require("../services/user.services")


const getAllUser = (req, res) => {
    let data = findAll()
    res.json({
        message: "Get All User",
        data
    })
}

const getUserById = (req, res) => {
    res.json({
        message: "getUserById",
    })
}

const addUser = (req, res) => {
    res.json({
        message: "Add User",
    })
}


module.exports = { getAllUser, addUser, getUserById }