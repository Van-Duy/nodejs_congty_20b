
const { findAll, findById, createUser, deleteUser, editUser, findUserByUsername, findOneItem } = require("../services/product.services")
const { ErrorCustom, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../apps/core/error.res")
const { Ok, Create } = require("../apps/core/success.res")


const getAllItems = async  (req, res) => {
    new Ok({
        message: "Get All Product",
        metadata: await findAll(req.query)
    }).send(res)
}

const getItemsById = async (req, res) => {
    const { id } = req.params;
    
    new Ok({
        message : "Get Product By Id",
        metadata : {
            data: await findById(id)
        }
    }).send(res)
}
const getProductByCategory = async (req, res) => {
    const { categoryId } = req.params;
    
    new Ok({
        message: "getProductByCategory",
        metadata : {
            data: await findAll({ categoryId , ...req.query})
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
        message: "Create Product Success",
    }).send(res)
}


const updateItems = async (req, res) => {
    let { id } = req.params;
    let userData = req.body;

    if (!id) throw new BAD_REQUEST_ERROR()

    const idFind = await findById(id);
    if (!idFind) throw new BAD_REQUEST_ERROR("Not found id")


    let isOk = await editUser(id, userData);
    res.json({
        message: "Edit product",
        metaData: {}
    })
}


const removeItems = async (req, res) => {
    const { id } = req.params;

    const user = await deleteUser(id);

    res.json({
        message: "Delete product Success",
        data: user
    });
}

module.exports = { updateItems, getAllItems, addItems, getItemsById, removeItems, getProductByCategory }