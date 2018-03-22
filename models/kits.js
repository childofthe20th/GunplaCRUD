const mongoose = require('mongoose');
const kitSchema = new mongoose.Schema({
    name: String,
    grade: String,
    img: { type: [String], required: true },
    description: String
}, {timestamps: true});

const Kit = mongoose.model('Kit', kitSchema);

module.exports = Kit;
