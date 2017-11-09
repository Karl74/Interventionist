var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var path = require('path');
var routes = require("./serverRoutes/routes");

var app = express();

var PORT = process.env.PORT || 2727;
// mongoose.Promise = bluebird;
mongoose.Promise = global.Promise;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use("/", routes);

//var db = process.env.MONGODB_URI || "mongodb://localhost/interventionDb";
var db = "mongodb://localhost/interventionDb"
mongoose.connect(db, function(error) {
  //Log any errors connecting with mongoose
  if (error) {
    console.error(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});
console.log("hello dude what are you doing today");

app.listen(PORT, function(){
  console.log(`Listening on port: ${PORT}`);
});
