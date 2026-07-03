var express = require('express');
var router = express.Router();

const { buy  } = require('../controllers/order.controller')
const { asyncHandle } = require("../apps/utils/asyncHandle")
const { checkLogin, checkPermission } = require("../apps/middlewares/auth_middleware")

router.use(checkLogin)

router.post('/buy', asyncHandle(buy));




module.exports = router;