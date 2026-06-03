
const { findAll, createUser } = require("../services/user.services")


const getAllUser = async  (req, res) => {
    let data =  await findAll()
    res.json({
        message: "Get All User",
        data
    })
}

// xoa 
// getOne


const getUserById = (req, res) => {
    res.json({
        message: "getUserById",
    })
}

const addUser = async (req, res) => {
    await createUser(req.body)
    res.json({
        message: "Add User",
      
    })
}


module.exports = { getAllUser, addUser, getUserById }