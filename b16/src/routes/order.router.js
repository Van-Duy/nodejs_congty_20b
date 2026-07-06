var express = require('express');
var router = express.Router();

const { buy, getOrderByCode, history } = require('../controllers/order.controller')
const { asyncHandle } = require("../apps/utils/asyncHandle")
const { checkLogin, checkPermission } = require("../apps/middlewares/auth_middleware")

router.use(checkLogin)
// user
router.post('/buy', asyncHandle(buy));
// orderId
router.get('/history', asyncHandle(history));
router.get('/history/:code', asyncHandle(getOrderByCode));
router.put('/cancel/:id', asyncHandle(buy));
router.put('/success/:id', asyncHandle(buy));


router.use(checkPermission)
// admin
// router.get('/', asyncHandle(buy));
// router.get('/:id', asyncHandle(buy));
// router.put('/status/:id', asyncHandle(buy));
// router.delete('/:id', asyncHandle(buy));

// redis


module.exports = router;