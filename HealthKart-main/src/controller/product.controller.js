const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");

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
    }catch(err){
        return res.status(500).send(err.message);
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

// for sorting low to high
router.get("/priceHL/", async(req, res) =>{
    try{
        let  products = await Product.find().lean().exec();
        products = products.sort((a, b) => {
          return  b.curPrice - a.curPrice;
        });
        return res.status(200).send(products);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

//for sorting low to high 
router.get("/priceLH/", async(req, res) => {
    try{
        let items = await Product.find().lean().exec();
        items = items.sort((a, b) => {
         return   a.curPrice - b.curPrice;
        });
        return res.status(200).send(items);
    }catch(err){
        return res.status(500).send(err.message);
    }
} );

// api for searching an item
router.get("/search/:item/", async(req, res) => {
    try{
    const products = [];
        const els = await Product.find().lean().exec();
        els.forEach((x) => {
            if(x.name.toLowerCase().includes(req.params.item.toLowerCase())){
                products.push(x);
            }
        });

        return res.status(200).send(products);
    }catch(err){
        return res.status(200).send(err.message);
    }
});

module.exports = router;