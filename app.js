var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.connect('mongod://localhost/rotten-potatoes');

var app = express();
var Review = mongoose.model('Review', {
  title: String
});

// INITIALIZE BODY-PARSER AND ADD IT TO APP
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}));

app.post('/reviews', function (req, res) {
  Review.create(req.body, function(err, review){
    console.log(review)
    res.redirect('/')
  })
})

app.set('view engine', 'hbs');

// var reviews = [
//   { title: "Great Review"},
//   { title: "Next Review"}
// ];

// app.get('/', function (req, res) {
//   res.render('home', {msg: 'Hello World!'});

// });

app.get('/', function(req, res){
  Review.find(function(err, reviews){
    res.render('reviews-index', {reviews: reviews});
  })
  
});

app.get('/reviews/new', function (req, res) {
  res.render('reviews-new', {});
})


app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!');
});
