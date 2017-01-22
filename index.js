/**
 * Created by reuvenp on 1/22/2017.
 */
var express = require('express');
var app = express();
var mongo = require('mongoose');
mongo.Promise = global.Promise;
var Schema = mongo.Schema;
var cookieParser = require('cookie-parser');
var db = mongo.connect('mongodb://localhost:27017/ex7');

app.use(cookieParser());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/login', function (req, res) {

});

app.listen(3000);