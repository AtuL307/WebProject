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

/// GET Request
    // Index route
    app.get("/listings", async (req,res) => {
        let allListing = await Listing.find();
        res.render("listing/index.ejs" , {allListing});
    });

    // New route
    app.get("/listings/new", (req,res) => {
        res.render("listing/new.ejs");
    });

    //Edit route 
    app.get("/listings/:id/edit", async(req,res) =>{
        let{id} = req.params;
        let listing = await Listing.findById(id);
        //console.log(editList);
        res.render("listing/edit.ejs",{listing});
    });

    // Show route
    app.get("/listings/:id", async(req,res) => {
        let{id} = req.params;
        const listing = await Listing.findById(id);
        //console.log(id);
        res.render("listing/show.ejs" , {listing});
    });

    

/// POST Request

    app.post("/listings", async (req,res) => {
        //let{title,description,image,price,location,country} = req.body;
        //console.log(req.body.Listing);
        let newListing = new Listing(req.body.Listing);

        await newListing.save().then(res => {
            console.log("New listing was save");
        })
        .catch(err => {
            console.log(err);
        })
        
        res.redirect("/listings")
    });

/// PUT Request

    app.put("/listings/:id", async(req,res) => {
        let{id} = req.params;
        let list = req.body.Listing;
        //console.log(list);
        let l = await Listing.findByIdAndUpdate(id , {...list},{new:true});
        //console.log(l);
        res.redirect(`/listings/${id}`);
    });

/// DELETE Request

    app.delete("/listings/:id", async(req,res) => {
        let{id} = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect("/listings"); 
    });