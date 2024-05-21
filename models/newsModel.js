const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    name: String,
    content: String,
    image: String,
    publishedDate: Date,
});

module.exports = mongoose.model('News', newsSchema);
