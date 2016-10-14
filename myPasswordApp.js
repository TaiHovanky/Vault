var express = require('express');
var formidable = require('formidable');
var util = require('util');
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
    var idMatch;
    var pwdId = parseInt(req.params.id);
    accounts.forEach(function(account){
        if(account.id === pwdId){
            idMatch = account;
        }
    });
    if(idMatch){
        //var myInfo = res.json(idMatch);
        var myInfo = JSON.stringify(idMatch);
        res.render('myPasswordIndex', {acctInfo : "My account credentials:" + myInfo});
    }
});

app.post('/', function(req, res){
    function addAccounts(req, res){
        var fields = [];
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            res.writeHead(200, {'Content-Type': 'text/plain'});
            var objStr = util.inspect(fields).replace(/(\r\n|\n|\r)|[\{\}]/g, "");
            var arr = objStr.split(',');
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

app.listen(port);