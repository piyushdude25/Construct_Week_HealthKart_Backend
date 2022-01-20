const express = require("express");
const router = express.Router();
const User = require("../models/users.model");
const Cart = require("../models/cart.model");

// get --- for login
// post --- for registering

router.post("/" async(req, res) => {
    try{
        const user = await User.create(req.body);
        return res.status(200).send(user);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

router.get("/", async(req, res) => {
    try{
        const user = await User.find().lean().exec();
        return res.status(200).send(user);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

// Get cart items of a user 
router.get("/:id/cart", async(req, res) => {
    try{
        const items = await Cart.find({user: req.params.id}).populate("item").lean().exec();
        return res.status(200).send(items);
    }catch(err){
        return res.status(500).send(err.message);
    }
});

module.exports = router;


