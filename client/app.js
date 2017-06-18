var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	db_patient = require('../model/db_patient'),
	patient = require('../model/patient'),
    db_ops = require('../model/db_ops'),
    ops = require('../model/ops'),
    db_wordpres = require('../model/db_wordpres'),
    wordpres = require('../model/wordpres'),
    db_diagnose = require('../model/db_diagnose'),
    diagnose = require('../model/diagnose'),
    db_abbreviation = require('../model/db_abbreviation'),
    abbreviation = require('../model/abbreviation'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	app = express(),
    ejs = require("ejs"),
    fs = require("fs"),
    http = require("http");

app.use(jsonParser);

app.get('/patient', function(req,res,next){
        mongoose.model('Patient').find(function (err, patient) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(patient);
            }
        })
});

app.get('/patient/:name', function(req,res){
        var name = req.params.name.split(','); // ['Firstname','Lastname']
        var fname = name[0];
        var lname = name[1];
        console.log(fname);

        mongoose.model('Patient').find({ firstname:fname, lastname:lname}, function (err, patient) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(patient);
            }
        })
});

app.get('/patient/id/:id', function(req,res){

        var id = req.params.id;

        mongoose.model('Patient').find({_id:id}, function (err, patient) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(patient);
            }
        })
});

app.put('/patient/:name', function(req,res){
        var name = req.params.name.split(','); // ['Firstname','Lastname']
        var fname = name[0];
        var lname = name[1];

        mongoose.model('Patient').findOneAndUpdate({ firstname:fname, lastname:lname}, {

                firstname:req.body.firstname, 
                lastname:req.body.lastname,
                sex:req.body.sex,
                birthday:req.body.birthday,
                address:req.body.address,
                tel:req.body.tel,
                familydoctor:req.body.familydoctor,
                healthinsurance:req.body.healthinsurance,
                admission:req.body.admission,
                anamnese:req.body.anamnese
            }, {new: true}, function(err, patient) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(patient);
                    }
            }
        );
           
});

app.put('/patient/id/:id', function(req,res){
        var id = req.params.id;
        mongoose.model('Patient').findOneAndUpdate({ _id:id}, {

                firstname:req.body.firstname, 
                lastname:req.body.lastname,
                sex:req.body.sex,
                birthday:req.body.birthday,
                address:req.body.address,
                tel:req.body.tel,
                familydoctor:req.body.familydoctor,
                healthinsurance:req.body.healthinsurance,
                admission:req.body.admission,
                anamnese:req.body.anamnese
            }, {new: true}, function(err, patient) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(patient);
                    }
            }
        );
});

app.post('/patient', function(req,res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
    var sex = req.body.sex;
    var birthday = req.body.birthday;
    var address = req.body.address;
    var tel = req.body.tel;
    var familydoctor = req.body.familydoctor;
    var healthinsurance = req.body.healthinsurance;
	var admission = req.body.admission;
	var anamnese = req.body.anamnese;
	mongoose.model('Patient').create({
        firstname : firstname,
        lastname : lastname,
        sex : sex,
        birthday : birthday,
        address : address,
        tel : tel,
        familydoctor : familydoctor,
        healthinsurance : healthinsurance,
        admission : admission,
        anamnese : anamnese
        }, function (err, patient){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
            	//Patient has been created
              	console.log('POST creating new patient: ' + patient);
              	res.json(patient);
            }
        });
});

app.delete('/patient/:name', function(req,res){
        var name = req.params.name.split(','); // ['Firstname','Lastname']
        var fname = name[0];
        var lname = name[1];
        console.log(fname);

        mongoose.model('Patient').findOneAndRemove({ firstname:fname, lastname:lname}, function (err, patient) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.status(200).type("text").send("OK");
            }
        });
});

app.delete('/patient/id/:id', function(req,res){
        var id = req.params.id;
        mongoose.model('Patient').findOneAndRemove({ _id:id}, function (err, patient) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.status(200).type("text").send("OK");
            }
        });
});

app.get('/wordpres', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/wordpres",
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var wordpresdata = JSON.parse(chunk);
                console.log(wordpresdata);
                res.json(wordpresdata);
                res.end();
            });
        });
        externalRequest.end();
});

app.get('/wordpres/:pres', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/wordpres/"+req.params.pres,
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var wordpresdata = JSON.parse(chunk);
                console.log(wordpresdata);
                res.json(wordpresdata);
                res.end();
            });
        });
        externalRequest.end();
});

app.get('/diagnose', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/diagnose",
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var diagnosedata = JSON.parse(chunk);
                console.log(diagnosedata);
                res.json(diagnosedata);
                res.end();
            });
        });
        externalRequest.end();
});

app.get('/diagnose/:abbr', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/diagnose/"+req.params.abbr,
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var diagnosedata = JSON.parse(chunk);
                console.log(diagnosedata);
                res.json(diagnosedata);
                res.end();
            });
        });
        externalRequest.end();
});

app.get('/abbreviation', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/abbreviation",
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var abbreviationdata = JSON.parse(chunk);
                console.log(abbreviationdata);
                res.json(abbreviationdata);
                res.end();
            });
        });
        externalRequest.end();
});

app.get('/abbreviation/:abb', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/abbreviation/"+req.params.abb,
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var abbreviationdata = JSON.parse(chunk);
                console.log(abbreviationdata);
                res.json(abbreviationdata);
                res.end();
            });
        });
        externalRequest.end();
});

app.get('/ops', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/ops",
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var opsdata = JSON.parse(chunk);
                console.log(opsdata);
                res.json(opsdata);
                res.end();
            });
        });
        externalRequest.end();
});

app.get('/ops/:ops', jsonParser, function(req,res){
        var options = {
                host: "localhost",
                port: 8888,
                path: "/ops/"+req.params.ops,
                method: "GET",
                headers: {
                    accept: "application/json"
                }
            };
        var externalRequest = http.request(options, function(externalRequest) {
            console.log("Connected");
            externalRequest.on('data', function(chunk) {
                var opsdata = JSON.parse(chunk);
                console.log(opsdata);
                res.json(opsdata);
                res.end();
            });
        });
        externalRequest.end();
});


app.listen(3001);