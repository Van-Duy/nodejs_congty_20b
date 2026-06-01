var express = require('express');
var router = express.Router();

const { getAllUser, addUser, getUserById } = require('./../controllers/user.controller')


router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', addUser);


module.exports = router;