var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
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

// app.get('/', function(req, res) {
    
// });

app.get("/", function(req, res) {
    // res.render('home');
    request("https://www.cnn.com/", function(error, response, body) {
        // console.log(response);
        // console.log(body);
    // if (error) {
    //     console.log(error);
    // }
        
        var $ = cheerio.load(body);
        

        $("article h2").each(function(i, element) {
            console.log(i);
            console.log(element);
            var result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href");
            console.log(result.title);
            console.log(result.link);
        });
        // console.log(result);
    });
    
});

// app listening on port 300
app.listen(PORT, function(){
    console.log("App running on port " + PORT);
});