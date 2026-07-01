var express = require('express');
var router = express.Router();

const { uploadImages , uploadAvatar, getAllItems, addItems, getItemsById, removeItems, getProductByCategory, updateItems } = require('../controllers/product.controller')
const { asyncHandle } = require("../apps/utils/asyncHandle")
const { checkLogin, checkPermission } = require("../apps/middlewares/auth_middleware")

const upload = require("../apps/configs/multer.config")

router.get('/', asyncHandle(getAllItems));
router.get('/:id', asyncHandle(getItemsById));
router.get('/:categoryId/allProduct', asyncHandle(getProductByCategory));


router.use(checkLogin)
router.use(checkPermission)


router.post('/', asyncHandle(addItems));
router.put('/uploadAvatar/:idProduct', upload.single("avatar"), asyncHandle(uploadAvatar));
router.put('/uploadImages/:idProduct', upload.array("images", 10), asyncHandle(uploadImages));
router.put('/:id', asyncHandle(updateItems));
router.delete('/:id', asyncHandle(removeItems));

module.exports = router;