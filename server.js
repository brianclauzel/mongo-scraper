var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var db = require("./models");
var PORT = 3000;

var results = [];

var app = express();

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

// mongoose.Promise = Promise;


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect(MONGODB_URI);

app.get("/", function(req, res) {
   res.render("home");
    request("https://www.newyorktimes.com/", function(error, response, body) {


        var $ = cheerio.load(body);

        $("article h2").each(function(i, element) {
            
            var result = {};

            result.title = $(this)
            .siblings("a")
            .text();

            result.summary = $(this)
            .siblings("p.summary")
            .text();

            result.link = $(this)
            .children("a")
            .attr("href");
            console.log(result);

            results.push(result);

            
        });
            db.Article.collection.insert(results).then(function(dbArticle){
                // console.log(dbArticle);
            }).catch(function(err) {
                return res.json(err);
            });
        res.send("Scrape complete");
    });
});

app.get("/articles", function(req, res) {

    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

// app listening on port 300
app.listen(PORT, function(){
    console.log("App running on port " + PORT);
});