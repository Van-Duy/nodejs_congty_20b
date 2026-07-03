function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function customGetAll(
    { page = 1, limit = 20, status, keyword = "", select = "", isDelete = false, categoryId = "", is_hot = false, sortBy = "createdAt", sortDir = "desc", rangePrice }
) {
        let obj = {}
        let skip = (page - 1) * limit
        let selectArray = ["-isDelete", "-__v"]
    
        if (status == "active" || status == "inactive") {
            obj.status = status
        }
        if (categoryId) {
            obj.id_category = categoryId
        }
    
        if (is_hot) {
            obj.is_hot = is_hot
        }
    
        if (rangePrice) {
            let [min , max] = rangePrice.split(",")
            obj.price = { $gte : min , $lte : max }
        }
    
        if (keyword) {
            obj.name = { $regex : keyword , $options : "i" }
        }
    
        if (select) {
            selectArray = select.split(",")
        }
    
        obj.isDelete = false


    return {
        page,
        obj,
        sortBy,
        sortDir,
        skip,
        limit,
        selectArray
    }
        

}




module.exports = { getRandomInt, customGetAll }