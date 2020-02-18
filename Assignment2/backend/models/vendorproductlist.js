const mongoose = require('mongoose');

let productlist=new mongoose.Schema({
    username:{
        type:String
    },
    productname:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    initialquantity:{
        type:Number
    },
    status:{
        type:String
    }


});
module.exports = mongoose.model('productlist',productlist);