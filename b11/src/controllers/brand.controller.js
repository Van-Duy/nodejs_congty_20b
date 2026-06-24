
const { findAll, findById, createUser, deleteUser, editUser, findUserByUsername, findOneItem } = require("../services/brand.services")
const { ErrorCustom, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../apps/core/error.res")
const { Ok, Create } = require("../apps/core/success.res")


const getAllItems = async  (req, res) => {
    new Ok({
        message: "Get All User",
        metadata: await findAll(req.query)
    }).send(res)
}

const getItemsById = async (req, res) => {
    const { id } = req.params;
    
    new Ok({
        message : "Get User By Id",
        metadata : {
            data: await findById(id)
        }
    }).send(res)
}

const addItems = async (req, res) => {
    const { name } = req.body
    // cach 1
    // if(!slug) {
    //     req.body.slug = slugify(name)
    // }

    let category = await findOneItem({name : name})
    if (category) throw new BAD_REQUEST_ERROR("Đã có danh mục này rồi")


    await createUser(req.body)
    
    new Create({
        message: "Create Category Success",
    }).send(res)
}


const updateItems = async (req, res) => {
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


const removeItems = async (req, res) => {
    const { id } = req.params;

    const user = await deleteUser(id);

    res.json({
        message: "Delete User Success",
        data: user
    });
}

module.exports = { updateItems, getAllItems, addItems, getItemsById, removeItems }