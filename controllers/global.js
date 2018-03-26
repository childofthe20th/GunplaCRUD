const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const Kit = require('../models/kits.js');
const bcrypt = require('bcrypt');
const kitSeed = require('../models/kit_seed.js');
const userSeed = require('../models/user_seed.js');

router.get('/new', (req, res)=>{
    res.render('new.ejs', {
        currentUser: req.session.currentUser
    });
});

router.get('/seed_kits', (req, res)=>{
    Kit.create(kitSeed, (err, data)=>{
        res.redirect('/home');
    });
});

router.get('/seed_users', (req, res)=>{
    User.create(userSeed, (err, data)=>{
        res.redirect('/home');
    });
});

// My failed attempt at appending username to post

router.post('/gallery', (req, res)=>{
    if(req.session.currentUser){
        req.body.author = req.session.currentUser.username;
        Kit.create(req.body, ()=>{
            res.redirect('/home/gallery')
        });
    } else {
        Kit.create(req.body, ()=>{
            res.redirect('/home/gallery');
        });
    }

});

router.get('/gallery', (req, res)=>{
    Kit.find({}, (err, allKits)=>{
        res.render('gallery.ejs', {
            kits: allKits,
            currentUser: req.session.currentUser
        });
    });
});

router.get('/gallery/:id', (req, res)=>{
    Kit.findById(req.params.id, (err, foundKit)=>{
        res.render('show.ejs', {
            kits: foundKit,
            currentUser: req.session.currentUser
        });
    });
});

router.get('/gallery/:id/edit', (req, res)=>{
    Kit.findById(req.params.id, (err, foundKit)=>{
        res.render('edit.ejs', {
            kits: foundKit,
            currentUser: req.session.currentUser
        });
    });
});

router.put('/gallery/:id', (req, res)=>{
    Kit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedKit)=>{
        res.redirect('/home/gallery');
    });
});

router.delete('/gallery/:id', (req, res)=>{
    Kit.findByIdAndRemove(req.params.id, (err, deletedKit)=>{
        res.redirect('/home/gallery');
    });
});

router.get('/resources', (req, res)=>{
    res.render('resources.ejs', {
        currentUser: req.session.currentUser
    });
});

router.get('/getting_started', (req, res)=>{
    res.render('noob.ejs', {
        currentUser: req.session.currentUser
    });
});

router.get('/news_events', (req, res)=>{
    res.render('events.ejs', {
        currentUser: req.session.currentUser
    });
});

router.get('/profile', (req, res)=>{
    if(req.session.currentUser){
        res.render('sessions/profile.ejs', {
            currentUser: req.session.currentUser
        })
    } else {
        res.redirect('/home/new_session')
    }
});

router.get('/profile/:id/edit', (req, res)=>{
    if(req.session.currentUser){
        User.findById(req.params.id, (err, foundUser)=>{
            res.render('sessions/edit_p.ejs', {
                users: foundUser,
                currentUser: req.session.currentUser
            });
        });
    } else {
        res.redirect('/home/new_session')
    }
});

router.put('/profile/:id/edit', (req, res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
        res.redirect('/home/profile');
    });
});

router.delete('/profile/:id', (req, res)=>{
    User.findByIdAndRemove(req.session.currentUser.id, (err, deletedUser)=>{
        res.redirect('/home');
    });
});

router.get('/', (req, res)=>{
    res.render('home.ejs', {
        currentUser: req.session.currentUser
    });
});

router.delete('/', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/home');
    })
});

router.delete('/profile', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/home');
    })
});


module.exports = router;
