var express = require('express');
var router = express.Router();

const { updateItems, getAllItems, addItems, getItemsById, removeItems, getProductByCategory } = require('../controllers/product.controller')
const { asyncHandle } = require("../apps/utils/asyncHandle")
const { checkLogin, checkPermission } = require("../apps/middlewares/auth_middleware")

router.get('/', asyncHandle(getAllItems));
router.get('/:id', asyncHandle(getItemsById));
router.get('/:categoryId/allProduct', asyncHandle(getProductByCategory));

router.use(checkLogin)
router.use(checkPermission)

router.post('/', asyncHandle(addItems));
router.put('/:id', asyncHandle(updateItems));
router.delete('/:id', asyncHandle(removeItems));

module.exports = router;