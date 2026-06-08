
const { findAll, findById, createUser, deleteUser, editUser } = require("../services/user.services")
const { ErrorCustom, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../apps/core/error.res")
const { Ok } = require("../apps/core/success.res")


const getAllUser = async  (req, res) => {
    let data = await findAll()
    new Ok({
        message: "Get All User",
        metadata: {
            data
        }
    }).send(res)
}

// xoa 
// getOne

const getUserById = async (req, res) => {
    const { id } = req.params;
    
    new Ok({
        message : "Get User By Id",
        metadata : {
            data: await findById(id)
        }
    }).send(res)
}

const addUser = async (req, res) => {
    console.log(req.body)
    await createUser(req.body)
    new Create({

    }).send(res)
}


const updateUser = async (req, res) => {
    let { id } = req.params;
    let userData = req.body;

    if (!id) throw new BAD_REQUEST_ERROR()
    // check id có phải là id của mongdb hay không

    const idFind = await findById(id);
    if (!idFind) throw new BAD_REQUEST_ERROR("Not found id")

    

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