var mongoose = require('mongoose');
var diagnoseSchema = new mongoose.Schema({   
	longterm: String, 
	key: String,
	abbreviation: String
	}); 
mongoose.model('Diagnose', diagnoseSchema);