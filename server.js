const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Kit = require('./models/kits.js')

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.get('/home/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/home/gallery', (req, res)=>{
    Kit.create(req.body, ()=>{
        res.redirect('/home/gallery');
    });
});

app.get('/home/gallery', (req, res)=>{
    Kit.find({}, (err, allKits)=>{
        res.render('gallery.ejs', {
            kits: allKits
        });
    });
});

app.get('/home/gallery/:id', (req, res)=>{
    Kit.findById(req.params.id, (err, foundKit)=>{
        res.render('show.ejs', {
            kits: foundKit
        });
    });
});

app.get('/home/gallery/:id/edit', (req, res)=>{
    Kit.findById(req.params.id, (err, foundKit)=>{
        res.render('edit.ejs', {
            kits: foundKit
        });
    });
});

app.put('/home/gallery/:id', (req, res)=>{
    Kit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedKit)=>{
        res.redirect('/home/gallery');
    });
});

app.delete('/home/gallery/:id', (req, res)=>{
    Kit.findByIdAndRemove(req.params.id, (err, deletedKit)=>{
        res.redirect('/home/gallery');
    });
});

app.get('/home/resources', (req, res)=>{
    res.render('resources.ejs');
})

app.get('/home/getting_started', (req, res)=>{
    res.render('noob.ejs');
})

app.get('/home/news_events', (req, res)=>{
    res.render('events.ejs');
})

app.get('/home', (req, res)=>{
    res.render('home.ejs');
});

mongoose.connect('mongodb://localhost:27017/gunpla');
mongoose.connection.once('open', ()=>{
    console.log('Connected to the Almighty Mongod');
});

app.listen(3000, ()=>{
    console.log('Listening...');
});
