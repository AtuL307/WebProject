const express = require("express");
const app = express();
const path = require("path");
var methodOverride = require("method-override");

/// Import from model

    const Listing = require("./model/listing.js");


///Mongoose db connection

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

/// Server listening 
    const port = 3000;
    app.listen(port , ()=> {
        console.log(`Server is connected to port ${port} `);
    });

/// GET request
    // Index route
    app.get("/listings", async (req,res) => {
        let allListing = await Listing.find();
        res.render("listing/index.ejs" , {allListing});
    });

    // New route
    app.get("/listings/new", (req,res) => {
        res.render("listing/new.ejs");
    });

    // Show route
    app.get("/listings/:id", async(req,res) => {
        let{id} = req.params;
        const listing = await Listing.findById(id);
        //console.log(id);
        res.render("listing/show.ejs" , {listing});
    });

/// POST

    app.post("/listings",(req,res) => {
        let{title,description,image,price,location,country} = req.body;
        let newListing = new Listing({
            title: title,
            description: description,
            image: image,
            price: price,
            location: location,
            country: country,
        });

        newListing.save().then(res => {
            console.log("New listing was save");
        })
        .catch(err => {
            console.log(err);
        })
        
    });