var express = require('express');
var router = express.Router();

const { getAllUser, updateUser , addUser, getUserById, removeUser } = require('./../controllers/user.controller')
const { asyncHandle } = require("./../apps/utils/asyncHandle")
const { checkLogin, checkPermission } = require("../apps/middlewares/auth_middleware")


router.use(checkLogin)
// router.use(checkPermission)

router.get('/', asyncHandle(getAllUser));
router.get('/:id', asyncHandle(getUserById));
router.post('/', asyncHandle(addUser));
router.put('/:id', asyncHandle(updateUser));
router.delete('/:id', asyncHandle(removeUser));

module.exports = router;