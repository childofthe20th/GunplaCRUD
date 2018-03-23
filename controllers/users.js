const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new_user', (req, res)=>{
    res.render('users/register.ejs', {
        currentUser: req.session.currentUser
    });
});

router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/home/new_session')
    });
});

module.exports = router;
