
const { findOneUser, createUser, editUser } = require("../services/user.services")
const { ErrorCustom, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../apps/core/error.res")
const { Ok, Create } = require("../apps/core/success.res")
const { getRandomInt } = require("../apps/helpers/helpers")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    let code = getRandomInt(100000,999999)
    
    //  send code => mail 985005 985001
    // == 985005
    // nodejs mailer https://nodemailer.com/

    // code
    // code_time :
    // luu
    await editUser(userFind._id , {
        code ,
        code_time : Date.now()
    })

    new Ok({
        message: "ForgotPassword",
    }).send(res)
}

const forgotPasswordCheckCode = async (req, res) => {
    const { email, code, password } = req.body 
    
    const userFind = await findOneUser({ email })
    if (!userFind) throw new BAD_REQUEST_ERROR("Email is not exist")

    // check time :userFind.code_time > Date.now() + 5000
    // check code : userFind.code

    // hash password
    // save user

    new Ok({
        message: "forgotPasswordCheckCode",
    }).send(res)
}








module.exports = { register, login, info, forgotPassword, forgotPasswordCheckCode }