const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

router.post("/", async(req, res) => {
    try{
        const product = await Product.create(req.body);
        return res.status(200).send(product);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

router.get("/", async(req, res) => {
    try{
        const product = await Product.find().lean().exec();
        return res.status(200).send(product);
    }
});

router.get("/item/:id", async(req, res) => {
    try{
        const product = await Product.findById(req.params.id).lean().exec();
        return res.status(200).send(product);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

