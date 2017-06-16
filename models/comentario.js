var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;
var Usuario = mongoose.model('Usuario');
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/appii");
autoIncrement.initialize(connection)

var comentario = Schema({
  _id: Number,
  _creator   : { type: Number, ref: 'Usuario' },
  opinion: String,  

});

comentario.plugin(autoIncrement.plugin, 'Comentario');
module.exports = mongoose.model('Comentario', comentario);
