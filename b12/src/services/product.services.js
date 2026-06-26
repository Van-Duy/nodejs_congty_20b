
const MainModel = require('../models/product.model')

const findAll = async (
    { page = 1, limit = 20, status, keyword = "", select = "", isDelete = false, categoryId = "", is_hot = false }
) => {
    let obj = {}
    let skip = (page - 1) * limit
    let selectArray = ["-isDelete", "-__v"]

    if (status == "active" || status == "inactive") {
        obj.status = status
    }
    if (categoryId) {
        obj.id_category = categoryId
    }

    if (is_hot) {
        obj.is_hot = is_hot
    }

    if (keyword) {
        obj.name = { $regex : keyword , $options : "i" }
    }

    if (select) {
        selectArray = select.split(",")
    }

    obj.isDelete = isDelete

    let [data, total] = await Promise.all([
        MainModel
            .find(obj)
            .skip(skip)
            .limit(limit)
            .select(selectArray)
            .populate("id_category")
            .populate("id_brand"),
        MainModel.countDocuments(obj),
    ])

    return {
        page,
        limit,
        total,
        data
    }
}

const findUserByUsername = async (username) => {
    return await MainModel.findOne({ username });
};

const findOneItem = async (obj) => {
    return await MainModel.findOne(obj);
};

const editUser = async (id, {name , ordering , status}) => {
    await MainModel.findByIdAndUpdate(id, {name, ordering, status} , {
    })
    return true
}

const findById = async (id) => {
    return await MainModel.findById(id).populate("id_category")
}


const createUser = async (body) => {
    await MainModel.create(body)
    return true
}

const deleteUser = async (id) => {
    return await MainModel.findByIdAndUpdate(id, {
        isDelete : true
    })
}

module.exports = { findOneItem, findAll, findById, createUser, deleteUser, editUser, findUserByUsername }