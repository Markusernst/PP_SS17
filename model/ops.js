var mongoose = require('mongoose');  
var opsSchema = new mongoose.Schema(
{
   name:String,
   ops:String,
   nodes:Array
});
mongoose.model('Ops', opsSchema);