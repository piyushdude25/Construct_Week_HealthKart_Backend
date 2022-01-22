const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    imgPrime: {type: String, required: true},
    name: {type: String, required: true},
    oriPrice: {type: Number, required: true},
    curPrice: {type: Number, required: true},
    quantity: {type: Number, required: true},
    imgSub1: {type: String, required: true},
    imgSub2: {type: String, required: true},
    imgSub3: {type: String, required: true},
},{
    versionKey: false,
    timeStamps: true,
});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;