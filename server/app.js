//General Modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

//CC module for data initialization
var createData = require('./routes/initialData.js');

//Route Imports

//Database Variables
var mongoose = require("mongoose");
var mongoURI = "mongodb://localhost:27017/Teamcreator";
var MongoDB = mongoose.connect(mongoURI).connection;

//error connecting to the database
MongoDB.on("error", function(err){
 console.log("Mongo Connection Error :" + err);
});

//If we successfully hooked up to the database, let us know!
MongoDB.once("open", function(){
 console.log("Tots connected to Mongo, meow.");
});


createData();

//Set the port
app.set("port", (process.env.PORT || 5000));

//Middleware hookups
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("server/public/"));

//Routes
app.get("/", function(req,res){
  res.sendFile(path.resolve("server/public/views/index.html"));
});

//Listen
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});
