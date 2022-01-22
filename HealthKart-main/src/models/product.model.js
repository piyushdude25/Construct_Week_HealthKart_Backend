const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
imgPrime: {type: String, required: true},
name: {type: String, required: true},
oriPrice: {type: Number, required: true},
curPrice: {type: Number, required: true},
quantity: {type: Number, required: true},
imgSub1: {type: String, required: true},
imgSub2: {type: String, required: true},
imgSub3: {type: String, required: true},
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;