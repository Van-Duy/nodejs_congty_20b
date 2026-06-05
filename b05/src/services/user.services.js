
const UserModel = require('../models/user.model')

const findAll = async () => {
    let data = await UserModel.find({});
    return data
}

const findById = async (id) => {
    // let data = await UserModel.findById(id);
    // return data
    return await UserModel.findById(id)
}

const createUser = async (body) => {
    await UserModel.create(body)
    return true
}

const deleteUser = async (id) => {
    return await UserModel.findByIdAndDelete(id);
}

module.exports = { findAll, findById, createUser, deleteUser }