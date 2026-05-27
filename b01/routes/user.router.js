var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.json({
    message: "Get All User"
  })
});

router.post('/', function (req, res) {
  res.json({
      message: "Add User"
  })
});
router.put('/', function (req, res) {
  res.json({
    message: "Edit User"
  })
});

router.delete('/', function (req, res) {
  res.json({
    message: "Delete User"
  })
});


module.exports = router;