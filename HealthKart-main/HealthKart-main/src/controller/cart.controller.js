const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.model");

router.post("", async(req, res) => {
    try{
        const cart = await Cart.create(req.body);
        return res.status(200).send(cart);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

router.get("/", async(req, res) => {
    try{
        const carts = await Cart.find().lean().exec();
        return res.status(200).send(carts);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

router.get("/:id/", async(req, res) => {
    try{
        const cart = await Cart.findById(req.params.id).lean().exec();
        return res.status(200).send(cart);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

router.delete("/remove/:id/", async(req, res) => {
    try{
        const cart = await Cart.findByIdAndDelete(req.body.id).lean().exec();
        return res.status(200).send(cart);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

module.exports = router;