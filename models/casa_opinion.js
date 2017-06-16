var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/appii");
 
autoIncrement.initialize(connection)
var opinion = Schema({

  _user   : { type: Number, ref: 'Usuario' },
  _casa   : { type: Number, ref: 'Casa' },
  opinion     : String


  
  //fans     : [{ type: Number, ref: 'Person' }]
});

opinion.plugin(autoIncrement.plugin, 'OpinionCasa');
module.exports = mongoose.model('OpinionCasa', opinion);
