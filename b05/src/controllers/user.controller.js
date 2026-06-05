
const { findAll, findById, createUser, deleteUser } = require("../services/user.services")


const getAllUser = async  (req, res) => {
    let data =  await findAll()
    res.json({
        message: "Get All User",
        data
    })
}

// xoa 
// getOne

const getUserById = async (req, res) => {
    const { id } = req.params;
    
    const data = await findById(id);

    res.json({
        message: "Get User By Id",
        data
    });
}

const addUser = async (req, res) => {
    console.log(req.body)
    await createUser(req.body)
    res.json({
        message: "Add User",
      
    })
}

const removeUser = async (req, res) => {
    const { id } = req.params;

    const user = await deleteUser(id);

    res.json({
        message: "Delete User Success",
        data: user
    });
}

module.exports = { getAllUser, addUser, getUserById, removeUser }