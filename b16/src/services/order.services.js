
const MainModel = require('../models/order.model')

const create = async (obj) => {
    return await MainModel.create(obj);
}

const getAllByParams = async (obj) => {
    return await MainModel.find(obj);
}

const findOne = async (obj) => {
    return await MainModel
    .findOne(obj)
        .populate("items.id_product", "name avatar description");
}

module.exports = { create, findOne, getAllByParams }