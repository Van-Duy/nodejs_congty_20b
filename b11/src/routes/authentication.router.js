var express = require('express');
var router = express.Router();
const { register, login, info, forgotPassword, forgotPasswordCheckCode, changePass } = require("../controllers/auth.controller")
const { asyncHandle } = require("./../apps/utils/asyncHandle")
const { checkLogin } = require("../apps/middlewares/auth_middleware")

router.post('/register', asyncHandle(register));
router.post('/login', asyncHandle(login));
router.post('/forgotPassword', asyncHandle(forgotPassword));
router.post('/forgotPasswordCheckCode', asyncHandle(forgotPasswordCheckCode));

router.use(checkLogin)

router.get('/info', asyncHandle(info));
router.post('/changePass', asyncHandle(changePass));

// forgot password



module.exports = router;