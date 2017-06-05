var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
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

app.get('/wordpres', function(req,res,next){
		mongoose.model('Wordpres').find(function (err, wordpres) {
			if (err) {
                return next(err);
            } else {
              	res.json(wordpres);
            }
        })
});

app.get('/diagnose', function(req,res,next){
		mongoose.model('Diagnose').find(function (err, diagnose) {
			if (err) {
                return next(err);
            } else {
              	res.json(diagnose);
            }
        })
});

app.get('/abbreviation', function(req,res,next){
		mongoose.model('Abbreviation').find(function (err, abbreviation) {
			if (err) {
                return next(err);
            } else {
              	res.json(abbreviation);
            }
        })
});

app.get('/ops', function(req,res,next){
		mongoose.model('Ops').find(function (err, ops) {
			if (err) {
                return next(err);
            } else {
              	res.json(ops);
            }
        })
});

app.get('/ops/:ops', function(req,res){
		var ops = req.params.ops;

        mongoose.model('Ops').find({ ops:ops }, function (err, ops) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(ops);
            }
        })
});

app.get('/wordpres/:pres', function(req,res){
        var pres = req.params.pres;

        mongoose.model('Wordpres').find({ name:pres }, function (err, wordpres) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
});

app.get('/wordpres/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Wordpres').find({ _id:id }, function (err, wordpres) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
});

app.get('/diagnose/:abbr', function(req,res){
        var abbr = req.params.abbr;

        mongoose.model('Diagnose').find({ abbreviation:abbr}, function (err, diagnose) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(diagnose);
            }
        })
});

app.get('/diagnose/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Diagnose').find({ _id:id}, function (err, diagnose) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(diagnose);
            }
        })
});

app.get('/abbreviation/:abb', function(req,res){
        var abb = req.params.abb;

        mongoose.model('Abbreviation').find({ abbreviation:abb }, function (err, abbreviation) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation);
            }
        })
});

app.get('/abbreviation/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Abbreviation').find({ _id:id }, function (err, abbreviation) {
            if (err) {
                res.send("There was a problem getting the information from the database.");
            } else {
                res.json(abbreviation);
            }
        })
});

app.post('/wordpres', function(req,res){
	var name = req.body.name;
	var keywords = req.body.keywords;
    var body = req.body.body;
	
	mongoose.model('Wordpres').create({
        name : name,
        keywords : keywords,
        body : body
        
        }, function (err, wordpres){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
            	//Patient has been created
              	console.log('POST creating new wordpres: ' + wordpres);
              	res.json(wordpres);
            }
        })
});

app.post('/diagnose', function(req,res){
	var longterm = req.body.longterm;
	var key = req.body.key;
    var abbreviation = req.body.abbreviation;
	
	mongoose.model('Diagnose').create({
        longterm : longterm,
        key : key,
        abbreviation : abbreviation
        
        }, function (err, diagnose){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
            	//Patient has been created
              	console.log('POST creating new diagnose: ' + diagnose);
              	res.json(diagnose);
            }
        })
});

app.post('/abbreviation', function(req,res){
	var word = req.body.word;
    var abbreviation = req.body.abbreviation;
	
	mongoose.model('Abbreviation').create({
        word : word,
        abbreviation : abbreviation
        
        }, function (err, abbreviation){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
            	//Patient has been created
              	console.log('POST creating new abbreviation: ' + abbreviation);
              	res.json(abbreviation);
            }
        })
});

app.post('/ops', function(req,res){
	var name = req.body.name;
    var ops = req.body.ops;
	var nodes = req.body.nodes;

	mongoose.model('Ops').create({
        name : name,
        ops : ops,
        nodes : nodes
        
        }, function (err, ops){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
            	//Patient has been created
              	console.log('POST creating new ops: ' + ops);
              	res.json(ops);
            }
        })
});

app.put('/wordpres/:pres', function(req,res){
        var pres = req.params.pres;

        mongoose.model('Wordpres').findOneAndUpdate({ name:pres }, {

                name:req.body.name, 
                keywords:req.body.keywords,
                body:req.body.body
                
            }, {new: true}, function(err, wordpres) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(wordpres);
                    }
            }
        );
});

app.put('/diagnose/:abbr', function(req,res){
        var abbr = req.params.abbr;

        mongoose.model('Diagnose').findOneAndUpdate({ name:abbr }, {

                longterm:req.body.longterm, 
                key:req.body.key,
                abbreviation:req.body.abbreviation
                
            }, {new: true}, function(err, diagnose) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(diagnose);
                    }
            }
        );
});

app.put('/abbreviation/:abb', function(req,res){
        var abb = req.params.abb;

        var word = req.body.word;
    	var abbreviation = req.body.abbreviation;
        mongoose.model('Abbreviation').findOneAndUpdate({ abbreviation:abb }, {

                word:req.body.word, 
                abbreviation:req.body.abbreviation
                
            }, {new: true}, function(err, abbreviation) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(abbreviation);
                    }
            }
        );
});

app.put('/ops/:ops', function(req,res){
        var ops = req.params.ops;

        var name = req.body.name;
    	var ops = req.body.ops;
    	var nodes = req.body.nodes;
        mongoose.model('Ops').findOneAndUpdate({ ops:ops }, {

                name:req.body.name, 
                ops:req.body.ops,
                nodes:req.body.nodes

            }, {new: true}, function(err, ops) {
                    if (err) {
                        console.log('got an error');
                    }
                    else{
                        res.json(ops);
                    }
            }
        );
});

app.delete('/wordpres/:pres', function(req,res){
        var pres = req.params.pres;
        console.log(pres);

        mongoose.model('Wordpres').remove({ name:pres }, function (err, wordpres) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
});

app.delete('/wordpres/id/:id', function(req,res){
        var id = req.params.id;
        console.log(id);

        mongoose.model('Wordpres').remove({ _id:id }, function (err, wordpres) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(wordpres);
            }
        })
});

app.delete('/diagnose/:abbr', function(req,res){
        var abbr = req.params.abbr;
        console.log(abbr);

        mongoose.model('Diagnose').remove({ abbreviation:abbr }, function (err, diagnose) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(diagnose);
            }
        })
});

app.delete('/diagnose/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Patient').remove({ _id:id}, function (err, patient) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.status(200).type("text").send("OK");
            }
        })
});

app.delete('/abbreviation/:abb', function(req,res){
        var abb = req.params.abb;
        console.log(abb);

        mongoose.model('Abbreviation').remove({ abbreviation:abb }, function (err, abbreviation) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(abbreviation);
            }
        })
});

app.delete('/ops/:ops', function(req,res){
        var ops = req.params.ops;
        console.log(ops);

        mongoose.model('Ops').remove({ ops:ops }, function (err, ops) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.json(ops);
            }
        })
});

app.delete('/ops/id/:id', function(req,res){
        var id = req.params.id;

        mongoose.model('Ops').remove({ _id:id}, function (err, ops) {
            if (err) {
                res.send("There was a problem deleting the information from the database.");
            } else {
                res.status(200).type("text").send("OK");
            }
        })
});

app.listen(8888);