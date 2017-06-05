var mongoose = require('mongoose');
var abbreviationSchema = new mongoose.Schema({
	word: String,
	abbreviation: String
	});
mongoose.model('Abbreviation', abbreviationSchema);