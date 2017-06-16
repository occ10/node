var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;
var Usuario = mongoose.model('Usuario');
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/appii");
 
autoIncrement.initialize(connection)
var casa = Schema({

  _creator : { type: Number, ref: 'Usuario' },
  zona        : String,
  precio      : Number,
  telefono    : { type: String, unique: true },
  observacion : String,


  
  //fans     : [{ type: Number, ref: 'Person' }]
});

casa.plugin(autoIncrement.plugin, 'Casa');
module.exports = mongoose.model('Casa', casa);
