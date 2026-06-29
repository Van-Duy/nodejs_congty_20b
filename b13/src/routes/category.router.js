var express = require('express');
var router = express.Router();

const { getAllCategory, updateCategory, addCategory, getCategoryById, removeCategory, updateImageCategory } = require('./../controllers/category.controller')
const { asyncHandle } = require("./../apps/utils/asyncHandle")
const { checkLogin, checkPermission } = require("../apps/middlewares/auth_middleware")


const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', asyncHandle(getAllCategory));
router.get('/:id', asyncHandle(getCategoryById));

router.use(checkLogin)
router.use(checkPermission)

router.post('/', asyncHandle(addCategory));
router.put('/:id', asyncHandle(updateCategory));
router.put('/uploadImage/:idProduct', upload.single('image') , asyncHandle(updateImageCategory));
router.delete('/:id', asyncHandle(removeCategory));

module.exports = router;