const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
  res.send('Hello world from Router server');
});

router.post('/register', (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: 'Field is empty' });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: 'Email is already Present' });
      }

      const user = new User({ name, email, phone, work, password, cpassword });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: 'Registration Successfull.....' });
        })
        .catch((err) =>
          res.status(500).json({ error: 'Failed to Register.....' })
        );
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
