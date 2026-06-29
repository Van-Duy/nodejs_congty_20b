
const { findAll, findById, createUser, deleteUser, editItem, findUserByUsername, findOneItem } = require("../services/category.services")
const { ErrorCustom, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../apps/core/error.res")
const { Ok, Create } = require("../apps/core/success.res")
const  cloudinary  = require("../apps/configs/cloudinary.config")
const fs = require("node:fs")


const getAllCategory = async  (req, res) => {
    new Ok({
        message: "Get All User",
        metadata: await findAll(req.query)
    }).send(res)
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    
    new Ok({
        message : "Get User By Id",
        metadata : {
            data: await findById(id)
        }
    }).send(res)
}

const addCategory = async (req, res) => {
    const { name } = req.body
    // cach 1
    // if(!slug) {
    //     req.body.slug = slugify(name)
    // }

    let category = await findOneItem({name : name})
    if (category) throw new BAD_REQUEST_ERROR("Đã có danh mục này rồi")


   
    
    new Create({
        message: "Create Category Success",
        metadata: await createUser(req.body)
    }).send(res)
}


const updateImageCategory = async (req, res) => {

    const { idProduct } = req.params

    console.log(req.file)

    const uploadResult = await cloudinary.uploader
        .upload(
            req.file.path, {
                public_id: req.file.filename,
        })
        .catch((error) => {
            console.log(error);
        }).finally(() => {
            fs.unlinkSync(req.file.path)
        })

    
    res.json({
        message: "Upload Images Success",
        metaData: await editItem(idProduct, {
            image: uploadResult.url
        })
    })
}
const updateCategory = async (req, res) => {
    let { id } = req.params;
    let userData = req.body;

    

    if (!id) throw new BAD_REQUEST_ERROR()
    // check id có phải là id của mongdb hay không

    const idFind = await findById(id);
    if (!idFind) throw new BAD_REQUEST_ERROR("Not found id")

    

    let isOk = await editItem(id, userData);
    res.json({
        message: "Edit User",
        metaData: {}
    })
}


const removeCategory = async (req, res) => {
    const { id } = req.params;

    const user = await deleteUser(id);

    res.json({
        message: "Delete User Success",
        data: user
    });
}

module.exports = { updateCategory, getAllCategory, addCategory, getCategoryById, removeCategory, updateImageCategory }