const mongoose = require('mongoose');

let order=new mongoose.Schema({

    user:{
        type:String,
        required:true
    },
    pid:{
        type:mongoose.ObjectId,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    cancel:{
        type:Number,
        required:true
    },
    vreview:{
        type:String
        
    },
    vrate:{
        type:Number
    },
    preview:{
        type:String
    },
    prate:{
        type:Number
    }



});

module.exports = mongoose.model('order',order);