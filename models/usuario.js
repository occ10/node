var mongoose = require('mongoose')
  , Schema = mongoose.Schema
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/appii");
autoIncrement.initialize(connection)
  
var usuario = Schema({
 // _id     : String,
  nif     : { type: String, unique: true },
  name    : String,
  age     : Number,


});
usuario.plugin(autoIncrement.plugin, 'Usuario');
module.exports  = mongoose.model('Usuario', usuario);

