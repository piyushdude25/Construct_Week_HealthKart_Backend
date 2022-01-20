const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();


const connect = () => {
    return mongoose.connect(process.env.DB_URL);
}

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(2500, async() => {
    try{
        await connect();
        console.log("Port 2500 is Listening");
    }catch(err){
        console.log(err.message);
    }
});


