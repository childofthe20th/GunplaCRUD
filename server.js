const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Kit = require('./models/kits.js')

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.get('/home/new', (req, res)=>{
    res.render('new.ejs')
});

app.post('/gallery', (req, res)=>{
    Kit.create(req.body, ()=>{
        res.redirect('/gallery');
    });
});

app.get('/gallery', (req, res)=>{
    Kit.find({}, (err, allKits)=>{
        res.render('gallery.ejs', {
            kits: allKits
        });
    });
});

app.get('/gallery/:id', (req, res)=>{
    Kit.findById(req.params.id, (err, foundKit)=>{
        res.render('show.ejs', {
            kits: foundKit
        });
    });
});

app.get('/home', (req, res)=>{
    res.render('home.ejs')
});

mongoose.connect('mongodb://localhost:27017/gunpla');
mongoose.connection.once('open', ()=>{
    console.log('Connected to the Almighty Mongod');
});

app.listen(3000, ()=>{
    console.log('Listening...');
});
