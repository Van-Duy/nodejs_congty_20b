
const UserModel = require('../models/user.model')

const findAll = async () => {
    let data = await UserModel.find({});
    return data
}


const editUser = async (id, userData) => {
    await UserModel.findByIdAndUpdate(id, userData)
    return true
}

const findById = async (id) => {
    return await UserModel.findById(id)
    // return await UserModel.findOne({_id : id})
}

const createUser = async (body) => {
    await UserModel.create(body)
    return true
}

const deleteUser = async (id) => {
    return await UserModel.findByIdAndDelete(id);
}

module.exports = { findAll, findById, createUser, deleteUser, editUser }