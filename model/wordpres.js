var mongoose = require('mongoose');  
var wordpresSchema = new mongoose.Schema({  
  name: String,
  keywords: String,
  body: String
});
mongoose.model('Wordpres', wordpresSchema);