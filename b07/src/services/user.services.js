
const UserModel = require('../models/user.model')

const findAll = async ({ page = 1, limit = 20, status , keyword = ""  }) => {
    let obj = {}
    let skip = (page - 1) * limit

    if (status == "active" || status == "inactive") {
        obj.status = status
    }

    if (keyword) {
        // search keyword i g
        obj.username = { $regex : keyword , $options : "i" }
        // { username : a}
    }

    // let data = await UserModel
    //     .find(obj)
    //     .skip(skip)
    //     .limit(limit)
    // // 1s
    
    // let total = await UserModel.countDocuments(obj)

    let [data, total] = await Promise.all([
        UserModel
            .find(obj)
            .skip(skip)
            .limit(limit),
        UserModel.countDocuments(obj),

    ])

    return {
        page,
        limit,
        total,
        data
    }
}

const findUserByUsername = async (username) => {
    return await UserModel.findOne({ username });
};


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

module.exports = { findAll, findById, createUser, deleteUser, editUser, findUserByUsername }