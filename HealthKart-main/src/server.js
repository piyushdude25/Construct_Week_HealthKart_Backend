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

const userController = require("./controller/user.controller");

const productController = require("./controller/product.controller");

const cartController = require("./controller/cart.controller");

app.use("/users/", userController);

app.use("/carts/", cartController);

app.use("/products/", productController);


// ------Google Authenticaton Feature---//

// const passport = require("passport");
// const {Strategy} = require("passport-google-oauth20");
// const session = require('express-session')
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb){
//     cb(null, obj);
// });

// passport.use(new Strategy({
//     clientID : "344648579890-8qum84baej1958nll78vl54lhs0j6ctu.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL : "http://localhost:2500/auth/google/callback"
// },
// function (accessToken, refreshToken, profile, done){
//     // if user is already exist in your database login otherwise // save data and signup
//     done(null, {});
// }
// ));

// app.get("/auth/google/", passport.authenticate("google", {scope: ["profile"]}));

// app.get("/auth/google/callback/", passport.authenticate("google", {failureRedirect: "/auth/fail/"}), (req, res , next) => {
//     console.log(req.user, req.isAuthenticated());
//     res.send("user log in successful");
// })

// app.get("/auth/fail", (req, res, next) => {
// res.send("user logged in failed");
// });

// app.get("/logout/", (req, res, next) => {
//     req.logout();
//     console.log(req.isAuthenticated());
//     res.send("user is logged out");
// });






app.listen(2100, async() => {
    try{
        await connect();
        console.log("Port 2100 is Listening");
    }catch(err){
        console.log(err.message);
    }
});