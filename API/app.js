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
var port=8055;


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
function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}

function isMyWeb(referer){
    if(isContains(referer,"dooccn.com")) {
        return true;
    }
    if(isContains(referer,"shucunwang.com")){
        return true;
    }
    if(isContains(referer,"135995.com")){
        return true;
    }
    return false;
}
var Copyright="\r\n\r\n官方网站:http://www.dooccn.com";
//app.post('/compile',bruteforce.prevent,function(req, res)
app.post('/compile',function(req, res){

    ismyweb=isMyWeb(req.headers['referer']);

    var language = req.body.language;
    var code = req.body.code;
    var stdin = req.body.stdin;

    var folder= 'temp/' + random(10); //folder in which the temporary folder will be saved
    var path=__dirname+"/"; //current working path
    var vm_name=arr.imageArray[language]; //name of virtual machine that we want to execute
    var timeout_value=20;//Timeout Value, In Seconds

    //details of this are present in DockerSandbox.js
    var sandboxType = new sandBox(timeout_value,path,folder,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);



    //data will contain the output of the compiled/interpreted code
    //the result maybe normal program output, list of error messages or a Timeout error
    sandboxType.run(function(data,exec_time,err)
    {
        if(ismyweb){
            res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
        }else{
            res.send({output:data+Copyright, langid: language,code:code, errors:err, time:exec_time});
        }
        //console.log("Data: received: "+ data)

    });

});
app.post('/compile2',function(req, res)
//app.post('/compile',bruteforce.prevent,function(req, res)
{
    ismyweb=isMyWeb(req.headers['referer']);
    var language = req.body.language;
    var code = req.body.code;
    code=base64.decode(code);
    var stdin = req.body.stdin;

    var folder= 'temp/' + random(10); //folder in which the temporary folder will be saved
    var path=__dirname+"/"; //current working path
    var vm_name=arr.imageArray[language];//name of virtual machine that we want to execute
    var timeout_value=20;//Timeout Value, In Seconds

    //details of this are present in DockerSandbox.js
    var sandboxType = new sandBox(timeout_value,path,folder,vm_name,arr.compilerArray[language][0],arr.compilerArray[language][1],code,arr.compilerArray[language][2],arr.compilerArray[language][3],arr.compilerArray[language][4],stdin);


    //data will contain the output of the compiled/interpreted code
    //the result maybe normal program output, list of error messages or a Timeout error
    sandboxType.run(function(data,exec_time,err)
    {
        if(ismyweb){
            res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
        }else{
            res.send({output:data+Copyright, langid: language,code:code, errors:err, time:exec_time});
        }
        //console.log("Data: received: "+ data)

    });

});
app.all('/pull',function(req, res)
//app.post('/compile',bruteforce.prevent,function(req, res)
{
    var exec = require('child_process').exec;
    exec("docker pull "+config.imagename);
    console.log(req.body);
    res.send("ok");


});
app.all('/', function(req, res)
{
    res.sendfile("./x.html");
});

console.log("Listening at "+port)
app.listen(port);
