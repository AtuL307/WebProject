const express = require("express");
const app = express();
const path = require("path");
var methodOverride = require("method-override");

/// Import from model

    const Listing = require("./model/listing.js");


///Mongoose db conection

    const mongoose = require("mongoose");

    const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

    main().then(() =>{
        console.log("connection establish");
    })
    .catch((err) => {
        console.log(err);
    })

    async function main(){
        await mongoose.connect(MONGO_URL);
    }

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"))

app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));

const port = 3000;
app.listen(port , ()=> {
    console.log(`Server is connected to port ${port} `);
});