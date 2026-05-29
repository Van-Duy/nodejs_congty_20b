var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  res.json({
    message: "Get All User",
    data
  })
});

router.get('/:id', function (req, res) {
  const id = Number(req.params.id);
  // database find() "select name where id = id"
  const user = data.find(item => item.id === id);

  res.json({
    message: "Get User By Id",
    user
  })
});

// router.get('/:id', function (req, res) {
//   res.json({
//     message: "Get User By Id"
//   })
// });

router.post('/', function (req, res) {
  const { name } = req.body

  const newUser = {
    id: data.length + 1,
    name
  }

  data.push(newUser)

  res.json({
    message: "Add User",
    newUser
  })
});

router.delete('/:id', function (req, res) {
  let id = req.params.id;
  const index = data.findIndex(item => item.id == id);

  if (index !== -1) {
     data.splice(index, 1); 
  }
  res.json({
    message: "Delete User:" + id + index,
  })
});

router.put('/:id', function (req, res) {
  // params
  // body
  res.json({
    message: "Edit User"
  })
});


// router.delete('/:id', function (req, res) {
//   const id = Number(req.params.id);
//   data = data.filter(item => item.id !== id)
//   res.json({
//     message: "Delete Success"
//   })
// });


module.exports = router;