const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    image : {
        type : String,
        set : (v) => v===" " ? "https://images.unsplash.com/photo-1706277797839-2342706023be?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        : v,
    },
    price : {
        type : Number,
    },
    location : {
        type : String,
    },
    country : {
        type : String,
    },
});

const Listing = mongoose.model("Listing" , listingSchema);

module.exports = Listing;