var mongoose = require('mongoose');   
var patientSchema = new mongoose.Schema({   
	firstname: String, 
	lastname: String, 
	sex: String,
	birthday: Date,
	address: String,
	tel: String,
	familydoctor: String,
	healthinsurance: String,
	admission: Date, 
	anamnese: Array
}); 
mongoose.model('Patient', patientSchema);