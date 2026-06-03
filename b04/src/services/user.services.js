
const UserModel = require('../models/user.model')

const findAll = async () => {
    let data = await UserModel.find({});
    return data
}

const createUser = async (body) => {
    await UserModel.create(body)
    return true
}


module.exports = { findAll, createUser }