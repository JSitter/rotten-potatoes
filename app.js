var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.connect('localhost/rotten-potatoes');
//log mongo db connection errors to console
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

//setup Mongodb model
var Review = mongoose.model('Review', {
  title: String
});

// INITIALIZE BODY-PARSER AND ADD IT TO APP
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Setup handlebars view engine and pass in parameters
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}));

// CREATE review
app.post('/reviews', function (req, res) {
  Review.create(req.body, function(err, review) {
    console.log(review);

    res.redirect('/');
  })
})

app.set('view engine', 'hbs');

// Home route
app.get('/', function (req, res) {
  Review.find(function(err, reviews) {
    res.render('reviews-index', {reviews: reviews});
  })
})

app.get('/reviews/new', function (req, res) {
  res.render('reviews-new', {});
})


app.listen(30010, function () {
  console.log('Portfolio App listening on port 3000!');
});
