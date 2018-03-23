const mongoose = require('mongoose');

const userKitSchema = new mongoose.Schema({
    name: String,
    grade: String,
    img: { type: [String], required: true },
    description: String
}, {timestamps: true});

const userSchema = new mongoose.Schema({
    username: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    postedKits: [userKitSchema]
}, {timestamps: true});

const Article = mongoose.model('Article', userKitSchema);
const User = mongoose.model('User', userSchema);

module.exports = Article;
module.exports = User;
