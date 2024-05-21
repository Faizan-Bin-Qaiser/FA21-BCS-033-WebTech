const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    buyLink: String, 
});

module.exports = mongoose.model('Game', gameSchema);
