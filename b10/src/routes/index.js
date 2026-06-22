var express = require('express');
var router = express.Router();

router.use("/users" , require("./user.router"))
router.use("/category", require("./category.router"))
router.use("/auth" , require("./authentication.router"))

module.exports = router;
