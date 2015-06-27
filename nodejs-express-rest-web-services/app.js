var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/books');

var Book = require('./models/Book');

var app = express();

var port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json 
app.use(bodyParser.json());

// register routes
app.use('/api/books', require('./routes/bookRoutes')(Book));
app.use('/api/authors', require('./routes/authorRoutes')());

app.get('/', function (req, res) {
    res.send('Welcome to my api!');
});

app.listen(port, function () {
    console.log('Running on port: ' + port);
});

module.exports = app;