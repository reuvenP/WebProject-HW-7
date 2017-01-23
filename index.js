/**
 * Created by reuvenp on 1/22/2017.
 */
var express = require('express');
var app = express();
var mongo = require('mongoose');
mongo.Promise = global.Promise;
var Schema = mongo.Schema;
var path = require('path');
var cookieParser = require('cookie-parser');
var db = mongo.connect('mongodb://localhost:27017/ex7');

app.use(cookieParser());
//app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    var userID = req.cookies['userID'];
    if (userID)
    {
        res.sendFile(__dirname + '/public/index.html');
    }
    else
    {
        res.redirect('/login');
    }
});

app.get('/login', function (req, res) {
    var userID = req.cookies['userID'];
    if (userID)
    {
        res.redirect('/');
    }
    else
    {
        res.sendFile(__dirname + '/public/login.html');
    }
});

app.get('/loginRest', function (req, res) {
    var user = req.query.username;
    res.cookie('userID', user);
    res.send();
});


app.listen(3000);