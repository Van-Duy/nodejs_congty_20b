var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.json({
    message: "Get All Category"
  })
});

router.post('/', function (req, res) {
  res.json({
      message: "Add Category"
  })
});
router.put('/', function (req, res) {
  res.json({
    message: "Edit Category"
  })
});

router.delete('/', function (req, res) {
  res.json({
    message: "Delete Category"
  })
});


module.exports = router;