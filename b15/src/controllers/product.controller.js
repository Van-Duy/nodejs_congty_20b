
const { findAll, findById, createUser, deleteUser, editItem, findUserByUsername, findOneItem } = require("../services/product.services")
const { ErrorCustom, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../apps/core/error.res")
const { Ok, Create } = require("../apps/core/success.res")
const cloudinary = require("../apps/configs/cloudinary.config")
const fs = require("node:fs")

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


    let isOk = await editItem(id, userData);
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

const uploadAvatar = async (req, res) => {
    // 1 nhan hinh => user gửi lên => locals
    // 2 locals sever => cloudinary => link_url || delete locals
    // 3. upload product link_url
    const { idProduct } = req.params
    if (!idProduct) throw new BAD_REQUEST_ERROR("Not found id")

    if (!req.file) throw new BAD_REQUEST_ERROR("Vui lòng chọn hình ảnh")

    const uploadResult = await cloudinary.uploader
        .upload(
            req.file.path, {
            public_id: req.file.filename,
            folder : "product"
        })
        .catch((error) => {
            console.log(error);
        }).finally(() => {
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path)
            }
        })
    
    res.json({
        message: "Upload Images Success",
        metaData: await editItem(idProduct, {
            avatar : uploadResult.url
        })
    })
}
const uploadImages = async (req, res) => {
    const { idProduct } = req.params
    if (!idProduct) throw new BAD_REQUEST_ERROR("Not found id")

    if (!req.files || req.files.length == 0) throw new BAD_REQUEST_ERROR("Vui lòng chọn hình ảnh")

    const resultUploads = await  Promise.all(req.files.map(async (file) => {
        try {
            return await cloudinary.uploader
                .upload(
                    file.path, {
                    public_id: file.filename,
                    folder: "product"
                })
        } 
        finally {
            if(fs.existsSync(file.path)) {
                fs.unlinkSync(file.path)
            }
        }
    }))

    const images = resultUploads.map(item => item.secure_url || item.url)

    res.json({
        message: "uploadImages Success",
        metadata: await editItem(idProduct, {
            images: images
        })
        
    })
}


module.exports = { uploadImages, uploadAvatar, updateItems, getAllItems, addItems, getItemsById, removeItems, getProductByCategory }