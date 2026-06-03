
const UserModel = require('../models/user.model')

const findAll = () => {
    // call database
    return [{id : 1 , name : "duy"}]
}

const create = (body) => {
    UserModel.create(body)
    return true
}


module.exports = { findAll, create }