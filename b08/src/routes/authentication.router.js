var express = require('express');
var router = express.Router();
const { register, login, info } = require("../controllers/auth.controller")
const { asyncHandle } = require("./../apps/utils/asyncHandle")
var jwt = require('jsonwebtoken');

// router.post('/login', function (req, res) {
//   res.json({
//     message: "Login"
//   })
// });



router.post('/register', asyncHandle(register));
router.post('/login', asyncHandle(login));


router.use((req,res,next) => {
  try {
    const bearerToken = req.headers.authorization
    const arrDataToken = bearerToken.split(" ")
    const token = arrDataToken[1]

    var decoded = jwt.verify(token, process.env.privateKey);
    req.userId = decoded.id
    next()
    
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message : "Not Login"
    })
  }
})

router.get('/info', asyncHandle(info));

// forgot password
// 1.
// 2.


module.exports = router;