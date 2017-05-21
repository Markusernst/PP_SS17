var mongoose = require('mongoose');  
var diagnoseSchema = new mongoose.Schema({  
  longterm: String,
  key: String
});
mongoose.model('Diagnose', diagnoseSchema);