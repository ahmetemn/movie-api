const User = require('../models/Users')
const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/register', (req, res, next) => {

  const { username, password } = req.body;

  bcryptjs.hash(password, 8).then((hash)=> {
    // Store hash in your password DB.

    const user = new User({
      username: username,
      password: hash
    });
  
  
    const promise = user.save()
    promise.then((data) =>{
      res.json(data);
    }).catch((err)=>{
      res.json(err)
    })
});
  
})
module.exports = router;
