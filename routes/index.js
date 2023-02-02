const User = require('../models/Users')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/register', (req, res, next) => {

  const { username, password } = req.body;

  bcryptjs.hash(password, 8).then((hash) => {
    // Store hash in your password DB.

    const user = new User({
      username: username,
      password: hash
    });


    const promise = user.save()
    promise.then((data) => {
      res.json(data);
    }).catch(() => {
      res.json({

        status: 2,
        message: 'username already taken'

      })
    })
  });

})


router.post('/authentication', (req, res) => {

  const { username, password } = req.body;
  ///req.params.username , req.body
  const promise = User.findOne({ username: username });
  promise.then((user) => {
    if (!user) {
      res.json({
        status: false,
        message: "there isnt user "
      })
    }
    else {
      bcryptjs.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'wrong password'
          })
        }

        else {
          const payload = {
            username: username,

          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 10 // minutes
          });
          res.json({
            status: true,
            token
          })
        }
      })
    }


  }).catch((err) => {
    res.json(err)
  })


});



module.exports = router;
