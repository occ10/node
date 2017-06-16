var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;
var Usuario = mongoose.model('Usuario');
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/appii");
autoIncrement.initialize(connection)

var coche = Schema({

  _creator : { type: Number, ref: 'Usuario' },
  matricula    : { type: String, unique: true },
  modelo : String,
  color  : String,
  precio : Number,
  
  //fans     : [{ type: Number, ref: 'Person' }]
});

coche.plugin(autoIncrement.plugin, 'Coche');
module.exports = mongoose.model('Coche', coche);
