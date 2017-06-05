var mongoose = require('mongoose');  
var wordpresSchema = new mongoose.Schema({  
  name: String,
  keywords: Array,
  body: String
});
mongoose.model('Wordpres', wordpresSchema);