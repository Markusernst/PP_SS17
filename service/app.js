var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	db = require('../model/db_patient'),
	patient = require('../model/patient'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	app = express();

app.use(jsonParser);

app.post('/patient', function(req,res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var admission = req.body.admission;
	var diagnose = req.body.diagnose;
	console.log(firstname);
	console.log(lastname);
	console.log(admission);
	console.log(diagnose);
	
	mongoose.model('Patient').create({
        firstname : firstname,
        lastname : lastname,
        admission : admission,
        diagnose : diagnose
        }, function (err, patient){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
            	//Patient has been created
              	console.log('POST creating new patient: ' + patient);
              	res.json(patient);
            }
        })
});



app.get('/patient', function(req,res,next){
		mongoose.model('Patient').find(function (err, patient) {
			if (err) {
                return next(err);
            } else {
              	res.json(patient);
            }
        })
});


app.listen(8888);