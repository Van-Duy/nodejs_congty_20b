
const MainModel = require('../models/product.model')
const { customGetAll  } = require("../apps/helpers/helpers")

const { setCache , getCache } = require("../apps/configs/redis.config")

let sortObj = (objParams = {}) => {
    return Object.keys(objParams).sort().reduce((res , key) => {
        res[key] = objParams[key]
        return res
    } , {})
    // product:{"limit":"20","page":"1"}
}


const findAll = async (params) => {
    let cacheKey = `product:${JSON.stringify(sortObj(params))}`
    // product:{"limit":"20","page":"1"}
    console.log(cacheKey)

    // check redis có dữ liệu lưu chưa
    let cacheData = await getCache(cacheKey)
    if (cacheData) {
        return cacheData
    }
    // nếu có rồi return
    // nếu chư hoạt động bình thường 

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


    let result = {
        page,
        limit,
        total,
        data
    }
    // lưu redis
    await setCache(cacheKey, result )



    return result
}

const findUserByUsername = async (username) => {
    return await MainModel.findOne({ username });
};

const findOneItem = async (obj) => {
    return await MainModel.findOne(obj);
};
const findByIdAndUpdate = async (id , obj) => {
    return await MainModel.findByIdAndUpdate(id ,obj);
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

module.exports = { findByIdAndUpdate , findOneItem, findAll, findById, createUser, deleteUser, editItem, findUserByUsername }