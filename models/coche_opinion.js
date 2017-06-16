var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;
var Usuario = mongoose.model('Usuario');
var coche = mongoose.model('Coche');
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/appii");
 
autoIncrement.initialize(connection)
var opinion = Schema({


  _user : { type: Number, ref: 'Usuario',required: true},
  _car    : {type: Number, ref: 'Coche',required: true },
  opinion        : String,


  
  //fans     : [{ type: Number, ref: 'Person' }]
});

opinion.plugin(autoIncrement.plugin, 'OpinionCoche');
module.exports = mongoose.model('OpinionCoche', opinion);
