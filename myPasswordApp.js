var express = require('express');
var formidable = require('formidable');
var util = require('util');
var bodyparser = require('body-parser');
var _ = require('underscore');
var fs = require('fs');

var app = express();
app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;

var accounts = [];
var idCnt = 1;

app.get('/', function(req, res){
    res.render('myPasswordIndex', {acctInfo : "My account credentials:"});
});

app.get('/mypwds/:id', function(req, res){   
    var pwdId = parseInt(req.params.id);
    var idMatch = _.findWhere(accounts, {id: pwdId});
    if(idMatch){
        var myInfo = JSON.stringify(idMatch);
        res.render('myPasswordIndex', {acctInfo : "My account credentials:" + myInfo});
    } else {
        res.status(400).send();
    }
});

app.post('/', function(req, res){
    function addAccounts(req, res){
        var fields = [];
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            res.writeHead(200, {'Content-Type': 'text/plain'});
            var objStr = util.inspect(fields).replace(/(\r\n|\n|\r)|[\{\}]/g, ""); //use util.inspect to grab fiels, then remove the new lines and curly braces
            var arr = objStr.split(','); //conver the objStr string into an array
            var myObj = {};
            arr.forEach(function(prop){
                var pair = prop.split(":");
                myObj[pair[0]] = pair[1];
            });
            myObj["id"] = idCnt++;
            accounts.push(myObj);
            res.end(objStr + " id: " + myObj.id);            
        });
    }
    addAccounts(req, res);
});

app.delete('/mypwds/:id', function(req, res){
    var pwdId = req.params.id;
    var idMatch = _.findWhere(accounts, {id: pwdId});
    if(isMatch){
        accounts = _.without(accounts, idMatch);
    } else {
        res.status(400).send('no account found');
    }
});

app.listen(port);