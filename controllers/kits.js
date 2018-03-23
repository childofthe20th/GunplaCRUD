const express = require('express');
const router = express.Router();
const Kit = require('../models/kits.js');
const User = require('../models/users.js');

router.get('/new', (req, res)=>{
    res.render('new.ejs');
});

router.post('/gallery', (req, res)=>{
    Kit.create(req.body, ()=>{
        res.redirect('/home/gallery');
    });
});

router.get('/gallery', (req, res)=>{
    Kit.find({}, (err, allKits)=>{
        res.render('gallery.ejs', {
            kits: allKits
        });
    });
});

router.get('/gallery/:id', (req, res)=>{
    Kit.findById(req.params.id, (err, foundKit)=>{
        res.render('show.ejs', {
            kits: foundKit
        });
    });
});

router.get('/gallery/:id/edit', (req, res)=>{
    Kit.findById(req.params.id, (err, foundKit)=>{
        res.render('edit.ejs', {
            kits: foundKit
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
    res.render('resources.ejs');
});

router.get('/getting_started', (req, res)=>{
    res.render('noob.ejs');
});

router.get('/news_events', (req, res)=>{
    res.render('events.ejs');
});

router.get('/', (req, res)=>{
    res.render('home.ejs');
});

module.exports = router;
