const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new_session', (req, res)=>{
    res.render('sessions/new_session.ejs')
});

router.post('/index', (req, res)=>{
    User.findOne({
        username: req.body.username
    }, (err, foundUser)=>{
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser;
            res.redirect('/home/index');
        } else {
            res.send('Wrong Password')
        }
    });
});

router.get('/index', (req, res)=>{
    User.find({}, (err, foundUsers)=>{
        users: foundUsers
    });
    res.render('index.ejs', {
        currentUser: req.session.currentUser
    });
});

router.get('/index/profile', (req, res)=>{
    res.render('users/profile.ejs', {
        currentUser: req.session.currentUser
    });
});

router.delete('/index', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/home');
    })
});

router.delete('/index/profile', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/home');
    })
});

module.exports = router;
