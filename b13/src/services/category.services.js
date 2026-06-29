
const MainModel = require('../models/categories.model')
const { customGetAll } = require("../apps/helpers/helpers")

const findAll = async (params) => {

    const {
        page, obj, sortBy, sortDir, skip, limit, selectArray
    } = customGetAll(params)


    let [data, total] = await Promise.all([
        MainModel
            .find(obj)
            .sort({ [sortBy]: sortDir })
            .skip(skip)
            .limit(limit)
            .select(selectArray),
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

const editItem = async (id, userData) => {
    await MainModel.findByIdAndUpdate(id, userData)
    return true
}

const findById = async (id) => {
    return await MainModel.findById(id)
    // return await MainModel.findOne({_id : id})
}

const createUser = async (body) => {
    return await MainModel.create(body)
}

const deleteUser = async (id) => {
    return await MainModel.findByIdAndDelete(id);
}

module.exports = { findOneItem, findAll, findById, createUser, deleteUser, editItem, findUserByUsername }