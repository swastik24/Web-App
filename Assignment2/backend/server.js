const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;
// mongoose.connection.db.dropDatabase()
connection.once('open', function() {
    // mongoose.connection.db.dropDatabase()
    console.log("MongoDB database connection established succesfully.");
})

const vendorrouter=require('./routes/vendorAPI');
const buyerrouter=require('./routes/buyerAPI');
const productlist=require('./routes/listAPI');
const orders=require('./routes/orderAPI');

app.use('/vendor',vendorrouter);
app.use('/buyer',buyerrouter);
app.use('/list',productlist);
app.use('/order',orders)


app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
