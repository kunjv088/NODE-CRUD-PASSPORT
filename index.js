const express = require ("express");
const port = 2354;
const path = require("path");
const fs = require("fs");
const cookies = require("cookie-parser");

const app = express();
const db = require('./config/db');
const passport = require("passport");
const session = require("express-session");


app.use(express.urlencoded());
app.use(cookies());
app.set("view engine","ejs");

app.use (
    session({
        name:"local",
        secret:"local",
        resave: true,
        saveUninitialized:false,
        cookie:{maxAge: 100*100*60,httpOnly: true},
    })
)
app.use(passport.initialize());
app.use(passport.session());


app.use("/",express.static(path.join(__dirname,"public")));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use("/",require("./routes/route"));



app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started in port" + port);
});