var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

//Connect to rotten-potatoes database
mongoose.connect('localhost/rotten-potatoes');

//Log mongo db connection errors to console
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

//Setup Mongodb model
var Review = mongoose.model('Review', {
  title: String
});

// INITIALIZE BODY-PARSER AND ADD IT TO APP
// Body parser to retrieve user post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Setup handlebars view engine and pass in setup parameters
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}));

//Set handlebars view engine
app.set('view engine', 'hbs');

//Get review post data
app.post('/reviews', function (req, res) {
  Review.create(req.body, function(err, review) {
    console.log(review);

    res.redirect('/');
  })
})

// Home route
app.get('/', function (req, res) {
  Review.find(function(err, reviews) {
    res.render('reviews-index', {reviews: reviews});
  })
})

//Route for form to post new Reviews
app.get('/reviews/new', function (req, res) {
  res.render('reviews-new', {});
})

//Listen on port 30010
app.listen(30010, function () {
  console.log('Rotten Potatoes listening on port 3000!');
});
