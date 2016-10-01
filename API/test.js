/*
        *File: app.js
        *Author: Asad Memon / Osman Ali Mian
        *Last Modified: 5th June 2014
        *Revised on: 30th June 2014 (Introduced Express-Brute for Bruteforce protection)
*/

var base64     = require('js-base64').Base64;
var express = require('express');
var arr = require('./compilers');
var config = require('./config');
var sandBox = require('./DockerSandbox');
var app = express.createServer();
var port=8056;


var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store,{
    freeRetries: 2,
    lifetime: 3600
});

app.use(express.static(__dirname));
app.use(express.bodyParser());

app.all('*', function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

function random(size) {
    //returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex');
}


app.all('/pull',function(req, res)
//app.post('/compile',bruteforce.prevent,function(req, res)
{
    console.log(req.body);
    res.send("ok");

});

app.all('/', function(req, res)
{
    res.sendfile("./x.html");
});

console.log("Listening at "+port)
app.listen(port);
