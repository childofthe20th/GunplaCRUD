const mongoose = require('mongoose');
const kitSchema = new mongoose.Schema({
    name: String,
    grade: String,
    img: [String],
    description: String
});

const Kit = mongoose.model('Kit', kitSchema);

module.exports = Kit;
