const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const port = process.env.PORT || 2500;



const connect = () => {
    return mongoose.connect(process.env.DB_URL);
}

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const userController = require("./controller/user.controller");

const productController = require("./controller/product.controller");

const cartController = require("./controller/cart.controller");

app.use("/users/", userController);

app.use("/carts/", cartController);

app.use("/products/", productController);


app.listen(port, async() => {
    try{
        await connect();
        console.log("Port 2500 is Listening");
    }catch(err){
        console.log(err.message);
    }
});


