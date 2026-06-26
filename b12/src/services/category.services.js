
const MainModel = require('../models/categories.model')

const findAll = async (
    { page = 1, limit = 20, status, keyword = "", select = "" }
) => {
    let obj = {}
    let skip = (page - 1) * limit

    if (status == "active" || status == "inactive") {
        obj.status = status
    }

    if (keyword) {
        obj.name = { $regex : keyword , $options : "i" }
    }

    let [data, total] = await Promise.all([
        MainModel
            .find(obj)
            .skip(skip)
            .limit(limit),
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

const editUser = async (id, userData) => {
    await MainModel.findByIdAndUpdate(id, userData)
    return true
}

const findById = async (id) => {
    return await MainModel.findById(id)
    // return await MainModel.findOne({_id : id})
}

const createUser = async (body) => {
    await MainModel.create(body)
    return true
}

const deleteUser = async (id) => {
    return await MainModel.findByIdAndDelete(id);
}

module.exports = { findOneItem ,  findAll, findById, createUser, deleteUser, editUser, findUserByUsername }