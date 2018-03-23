const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Kit = require('../models/kits.js');
const bcrypt = require('bcrypt');


router.get('/new_session', (req, res)=>{
    res.render('sessions/new_session.ejs', {
        currentUser: req.session.currentUser
    });
});

router.post('/new_session', (req, res)=>{
    User.findOne({
        username: req.body.username
    }, (err, foundUser)=>{
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser;
            res.redirect('/home');
        } else {
            res.send('Wrong Password')
        }
    });
});

module.exports = router;
