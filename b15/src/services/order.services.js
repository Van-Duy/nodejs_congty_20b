
const MainModel = require('../models/order.model')

const create = async (obj) => {
    return await MainModel.create(obj);
}

module.exports = { create }