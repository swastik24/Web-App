const mongoose = require('mongoose');

let vendor = new mongoose.Schema({
    username: {
        type: String,
        required :true,
        unique: true
    },
    password:{
        type: String,
        required :true
    }
});

module.exports = mongoose.model('vendor',vendor);