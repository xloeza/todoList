var mongoose = require('mongoose');

var Todo = mongoose.Schema({
        key: Number,
        text: String,
        completed:Boolean
    });

module.exports = mongoose.model('Todo', Todo);