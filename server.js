const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mojo',
    resave: false,
    saveUninitialize: false
}));

const kitsController = require('./controllers/kits.js');
app.use('/home', kitsController);

const usersController = require('./controllers/users.js');
app.use('/home', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/home', sessionsController);

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gunpla';

mongoose.connect(mongoURI);
mongoose.connection.once('open', ()=>{
    console.log('Connected to the Almighty Mongod');
});

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Listening...');
});
