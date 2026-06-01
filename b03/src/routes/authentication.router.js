var express = require('express');
var router = express.Router();

router.post('/login', function (req, res) {
  res.json({
    message: "Login"
  })
});
router.post('/register', function (req, res) {
  res.json({
    message: "Get All Category"
  })
});


module.exports = router;