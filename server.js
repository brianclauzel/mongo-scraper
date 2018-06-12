var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = requre("cheerio");
var db = require("./models");
var PORT = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('home');
});

// app listening on port 300
app.listen(PORT, function(){
    console.log("App running on port " + PORT);
})