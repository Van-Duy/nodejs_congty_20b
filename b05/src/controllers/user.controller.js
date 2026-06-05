
const { findAll, findById, createUser, deleteUser, editUser } = require("../services/user.services")


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


const updateUser = async (req, res) => {
    let { id } = req.params;
    let userData = req.body;

    if (!id) throw Error("Not find By id")
    // check id có phải là id của mongdb hay không

    const idFind = await findById(id);
    if (!idFind) throw Error("Not find By id")

    

    let isOk = await editUser(id, userData);
    res.json({
        message: "Edit User",
        metaData: {}
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

module.exports = { updateUser  , getAllUser, addUser, getUserById, removeUser }