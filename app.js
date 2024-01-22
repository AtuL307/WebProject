const express = require("express");
const app = express();
const path = require("path");
var methodOverride = require("method-override");


///Mongoose db conection

    const mongoose = require("mongoose");

    main().then(() =>{
        console.log("connection establish");
    })
    .catch((err) => {
        console.log(err);
    })

    async function main(){
        await mongoose.connect('mongodb://127.0.0.1:27017/');
    }

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"))

app.use(express.static(path.join(__dirname,"/public")));