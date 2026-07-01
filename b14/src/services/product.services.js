
const MainModel = require('../models/product.model')
const { customGetAll  } = require("../apps/helpers/helpers")

const findAll = async (params) => {

    const {
        page , obj,sortBy,sortDir,skip,limit,selectArray
    } = customGetAll(params)
   

    let [data, total] = await Promise.all([
        MainModel
            .find(obj)
            .sort({ [sortBy] : sortDir })
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

const editItem = async (id, { name, ordering, status, avatar, images }) => {
    await MainModel.findByIdAndUpdate(id, { name, ordering, status, avatar, images } , {
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

module.exports = { findOneItem, findAll, findById, createUser, deleteUser, editItem, findUserByUsername }