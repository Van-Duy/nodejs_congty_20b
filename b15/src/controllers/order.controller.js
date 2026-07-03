
const { create: createOder } = require("../services/order.services")
const { findById: findProductById, findByIdAndUpdate: findByIdAndUpdateProduct } = require("../services/product.services")
const { findById: findUserById } = require("../services/user.services")

const { getRandomInt  } = require("../apps/helpers/helpers")

const { ErrorCustom, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../apps/core/error.res")
const { Ok, Create } = require("../apps/core/success.res")
const  cloudinary  = require("../apps/configs/cloudinary.config")
const fs = require("node:fs")

const { sendMail } = require("../apps/helpers/send_mail")



const buy = async (req, res) => {
    let { items = [], address, phone, total } = req.body

    // kiem tra thong tin nguoi dung
    let user = await findUserById(req.userId)
    if (!user) throw new BAD_REQUEST_ERROR("User not null")
    
    // kiem tra san pham ( id_product , price)
    let totalPrice = 0
    for await (const product of items) {
        
        const productFind = await findProductById(product.id_product)
        if (!productFind) throw new BAD_REQUEST_ERROR("Product is not correct")

        if (productFind.price_sale) {
            if (productFind.price_sale !== product.price) throw new BAD_REQUEST_ERROR("Product price is not correct")
        }else {
            if (productFind.price !== product.price) throw new BAD_REQUEST_ERROR("Product price is not correct")
        }

        // kiem tra ton kho
        if (productFind.stock < product.quantity) throw new BAD_REQUEST_ERROR("Product stock is not correct")
        

        totalPrice += product.price * product.quantity
    }
    // tinh total or so sanh total
    if (total) {
        if (total !== totalPrice) throw new BAD_REQUEST_ERROR("Total price is not correct")
    }else {
        total = totalPrice
    }
    
    // tạo code 
    // gửi code cho người dùng
    let codeRandom = getRandomInt(100000,900000)
    let codeOrder = `KH-${codeRandom}`

    sendMail({
        email: user.email,
        html: `Kiem tra don hang voi ma : ${codeOrder}`
    })
    // zaloOA fetch(".........")

    // lưu đơn hàng
    await createOder({
        code: codeOrder,
        id_user : req.userId,
        address: address || user.address,
        phone: phone || user.phone,
        items,
        total,
    })


    // giảm lượt mua ( cập nhật tồn kho )

    for await (const product of items) {
        await findByIdAndUpdateProduct(product.id_product , {
            $inc : {
                stock: - product.quantity
            }
        })
    }
   
    // (kiem tra phi vận chuyển , mã giảm giá )

    new Create({
        message: "Buy Product Success",
    }).send(res)
}


// check return (id , thong)




module.exports = { buy }