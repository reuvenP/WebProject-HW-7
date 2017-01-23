/**
 * Created by reuvenp on 1/22/2017.
 */
var express = require('express');
var app = express();
var mongo = require('mongoose');
var mosca = require('mosca');
var mqtt = require('mqtt');
mongo.Promise = global.Promise;
var Schema = mongo.Schema;
var path = require('path');
var cookieParser = require('cookie-parser');
var db = mongo.connect('mongodb://localhost:27017/ex7');
var http = require('http').Server(express);
var io = require('socket.io')(http);

var pubsubsettings = { // define mqtt server backend at MongoDB mqtt DB
    type: 'mongo',
    url: 'mongodb://localhost:27017/ex7mqtt?auto_reconnect=true',
    pubsubCollection: 'ex7mqttcollection',
    mongo: {}
};

var settings = {
    port: 1883,
    backend: pubsubsettings,
    persistence: {
        factory: mosca.persistence.Mongo,
        url: 'mongodb://localhost:27017/ex7mqtt'
    }
};

var server = new mosca.Server(settings);

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

io.on('connection', function (socket) {
    console.log(socket.id);
    /*var client = mqtt.connect('mqtt://localhost:1883',
        { // keepalive: 10 set to 0 to disable
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            // protocolId: 'MQTT'
            // protocolVersion: 4
            clean: false
            // clean: true, set to false to receive QoS 1 and 2 messages while offline
            // reconnectPeriod: 1000 milliseconds, interval between two reconnections
            // connectTimeout: 30 * 1000 milliseconds, time to wait before a CONNACK is received
            // username: the username required by your broker, if any
            // password: the password required by your broker, if any
            // incomingStore: a Store for the incoming packets
            // outgoingStore: a Store for the outgoing packets
            // will: a message that will sent by the broker automatically when the client disconnect badly. The format is:
        });*/
});


app.listen(3000);