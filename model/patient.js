var mongoose = require('mongoose');  
var patientSchema = new mongoose.Schema({  
  firstname: String,
  lastname: String,
  admission: Date,
  diagnose: { 
  	diagnose: String, 
  	key: String,
  	date: Date
  	}
});
mongoose.model('Patient', patientSchema);