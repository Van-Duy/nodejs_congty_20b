
const { findOneUser, createUser } = require("../services/user.services")
const { ErrorCustom, BAD_REQUEST_ERROR, UNAUTHORIZED_ERROR } = require("../apps/core/error.res")
const { Ok, Create } = require("../apps/core/success.res")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// 1. Gui body (email , password)
// 2. Check email
// 3. check password ()
// 4. hash password
// 5. createUser

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

// 1. Gui body (email , password)
// 2. Check email => hashpassword
// 3. hashpassword compare password
// 4. create jwt token

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








module.exports = { register, login, info }