var express = require('express');
var router = express.Router();

const { getAllUser, addUser, getUserById, removeUser } = require('./../controllers/user.controller')


router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', addUser);
router.delete('/:id', removeUser);

module.exports = router;