var express = require('express')
var exphbs = require('express-handlebars');

var app = express()

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('home', {msg: 'Hello World!'})

})

app.listen(3000, function () {
  console.log('Portfolio App listening on port 3000!')
})
