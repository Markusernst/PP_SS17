var express = require("express"),
	bodyParser = require("body-parser"),
	jsonParser = bodyParser.json(),
	ejs = require("ejs"),
	fs = require("fs"),
	http = require("http"),
	app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(jsonParser);

app.get('/patient', jsonParser, function(req,res){
		var options = {
				host: "localhost",
				port: 8888,
				path: "/patient",
				method: "GET",
				headers: {
					accept: "application/json"
				}
			};
		var externalRequest = http.request(options, function(externalRequest) {
			console.log("Connected");
			externalRequest.on('data', function(chunk) {
				var patientdata = JSON.parse(chunk);
				console.log(patientdata);
				res.json(patientdata);
				res.end();
			});
		});
		externalRequest.end();
});


app.listen(3001);