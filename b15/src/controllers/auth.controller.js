
const { findOneUser, createUser, editUser } = require("../services/user.services")
const { ErrorCustom, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../apps/core/error.res")
const { Ok, Create } = require("../apps/core/success.res")
const { getRandomInt } = require("../apps/helpers/helpers")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { sendMail } = require("../apps/helpers/send_mail")

const saltRounds = 10;

const info = async (req, res) => {
    new Ok({
        message: "Get Info User",
        metadata: await findOneUser({ _id: req.userId })
    }).send(res)
}

const register = async  (req, res) => {
    const { email , password } = req.body

    const userFind = await findOneUser({email})
    if (userFind) throw new BAD_REQUEST_ERROR("Email exist")

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);



    const newUser = await createUser({
        email,
        password: hashPassword
    })

    new Create({
        message: "Create User",
        metadata: newUser
        
    }).send(res)
}

const changePass = async (req, res) => {
    const { password, new_pass , confirm_password }  = req.body

    const userFind = await findOneUser({ _id: req.userId })
    if (!userFind) throw new BAD_REQUEST_ERROR("User is not exist")

    
    const isPassword = bcrypt.compareSync(password, userFind.password);
    if (!isPassword) throw new BAD_REQUEST_ERROR("Password error")

    if (new_pass !== confirm_password) throw new BAD_REQUEST_ERROR("Password confirmPassword is not correct")
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(new_pass, salt);

    await editUser(userFind._id, {
        password: hashPassword
    })

    new Create({
        message: "ChangePass Success",
    }).send(res)
}

const login = async  (req, res) => {
    const { email , password } = req.body

    const userFind = await findOneUser({email})
    if (!userFind) throw new BAD_REQUEST_ERROR("Email or password error")

    const isPassword = bcrypt.compareSync(password, userFind.password);
    if (!isPassword) throw new BAD_REQUEST_ERROR("Email or password error")

    const token = jwt.sign(
        { id : userFind._id , email }, 
        process.env.privateKey
    );

    new Ok({
        message: "Login",
        metadata : {
            token
        }
    }).send(res)
}

const forgotPassword = async (req, res) => {
    const {email} = req.body

    const userFind = await findOneUser({ email })
    if (!userFind) throw new BAD_REQUEST_ERROR("Email is not exist")

    if (userFind.code != "") throw new BAD_REQUEST_ERROR("Code đã gửi , check mail")

    let code = getRandomInt(100000,999999)

    const link = `http://localhost:3000/api/v1/auth/forgotPasswordCheckCode?email=${email}&code=${code}`

    sendMail({
        email, html: `
        <b>Code : ${code}</b>
        <b>link : ${link}</b>

    ` })
  
    await editUser(userFind._id , {
        code ,
        code_time: Date.now() 
    })

    new Ok({
        message: "ForgotPassword",
        metadata : {
            "link": link
        }
    }).send(res)
}

const forgotPasswordCheckCode = async (req, res) => {
    const { email, code, password } = req.body 
    
    const userFind = await findOneUser({ email })
    if (!userFind) throw new BAD_REQUEST_ERROR("Email is not exist")

    if (userFind.code != code) throw new BAD_REQUEST_ERROR("Sai mã Code")

    // if (userFind.code_time < Date.now() - 1 * 60 * 1000) {
    //     throw new BAD_REQUEST_ERROR("Code hết hạn")
    // }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    await editUser(userFind._id, {
        code : "",
        code_time: null,
        password: hashPassword
    })

    new Ok({
        message: "Update Password Success",
    }).send(res)
}

module.exports = { register, login, info, forgotPassword, forgotPasswordCheckCode, changePass }