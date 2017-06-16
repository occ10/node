
//var auth = require('http-auth');
var jwt = require('jwt-simple');
var express= require('express')
var app=express()
var http     = require("http");
var server   = http.createServer(app);
var bd=require('body-parser')
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var cors = require('cors'); 

app.use(bd.json())
app.use(bd.urlencoded({ extended: false }));  
app.use(methodOverride());
var middleware = require('./middleware');

var appirest = require('./controllers/usuario');
var appirest2 = require('./controllers/coche');
var appirest3 = require('./controllers/casa');
var appirest4 = require('./controllers/coche_opinion');
var appirest5 = require('./controllers/casa_opinion');

var auth= require('./auth')
var usershow = express.Router();

var models1     = require('./models/usuario');
var usuario = mongoose.model('Usuario');



///autenticacion basica

//app.use('/api/user', auth.basicAuth); //autentificacion con auth-basic
app.use('/api/user/id/:id', auth.basicAuth); //autentificacion con auth-basic

//app.all('*', middleware.ensureAuthenticated); //autentiicacion basada en jsong token


app.use('/web', express.static('web'))
//Versión con JS-puro que incluye listado, modificar y eliminar elementos
app.use('/web-js', express.static('web-js'));


//login
usershow.route('/user/login').post(appirest.login)
app.use('/api', usershow);


usershow.get('/',function(req, res) {
  res.send("Hello world!");
});
app.use(usershow);

usershow.route('/user/house').get(appirest3.findAllhouses)
app.use('/api', usershow);


usershow.route('/user/car').get(appirest2.findAllcars)
app.use('/api', usershow);


usershow.route('/user/opinions/coche').get(appirest4.findAllopinions);
app.use('/api', usershow);

usershow.route('/user/opinions/casa').get(appirest5.findAllopinions);
app.use('/api', usershow);



//usuarios
//usershow.route('/user')
usershow.route('/user')
.get(appirest.findAllusers)
.post(appirest.addUsers);
app.use('/api', usershow);


usershow.route('/user/nif/:nif')
.get(appirest.findByNif)
.put(appirest.updateUserByNif)
.delete(appirest.deleteUserByNif);
app.use('/api', usershow);


usershow.route('/user/id/:id')
.delete(appirest.deleteUserById)
.get(appirest.findById)
.put(appirest.updateUserById);

app.use('/api', usershow);

//usershow.route('/collection/user/:id').get(appirest.collectionUser);
usershow.route('/collection/user/:pagina/:TamPagnia').get(appirest.collectionUser);

app.use('/api', usershow);

////usuarios


/////casas





  


usershow.route('/house').post(appirest3.addUsersHouse);

usershow.route('/house/id/:id')
.get(appirest3.findHouseById)
.put(appirest3.updateHouse)
.delete(appirest3.deleteHouse);

app.use('/api', usershow);


usershow.route('/user/house/:tel').get(appirest3.findUserHouse);
app.use('/api', usershow);

usershow.route('/collection/house/:id')
  .get(appirest3.collectionHouse);
app.use('/api', usershow);

usershow.route('/user/houses/:id').get(appirest3.findUserHouses)
app.use('/api', usershow);

///casas


///coches 




usershow.route('/user/car/:id').get(appirest2.findUserCars)

usershow.route('/user/car/matricula/:matricula').get(appirest2.findUserCarByMatricula);

app.use('/api', usershow);

usershow.route('/car').post(appirest2.addUsersCar);

usershow.route('/car/id/:id')
.get(appirest2.findCarById)
.put(appirest2.updateCar)
.delete(appirest2.deleteCar);

usershow.route('/collection/car/:id').get(appirest2.collectionCar);

app.use('/api', usershow);





//opiniones coche

usershow.route('/user/opinion/coche/:id').get(appirest4.findUserOpinions);
app.use('/api', usershow);

usershow.route('/user/opinion/coche/nif/:id').get(appirest4.findUserOpinionNif);
app.use('/api', usershow);

usershow.route('/collection/opinion/coche/:id').get(appirest4.collectionOpinions);
app.use('/api', usershow);

usershow.route('/user/opinion/coche').post(appirest4.addopinion)
app.use('/api', usershow);

usershow.route('/opinion/coche/:id')
.get(appirest4.findOpinionById)
.put(appirest4.updateOpinion)
.delete(appirest4.deleteOpinion);



app.use('/api', usershow);



////opiniones coche




//opiniones casas

usershow.route('/user/opinion/casa/:id').get(appirest5.findUserOpinions);


//usershow.route('/userOpinion/:op')
  //.get(appirest4.findUserOpinion);

usershow.route('/collection/opinion/casa/:id').get(appirest5.collectionOpinions);


usershow.route('/opinion/casa').post(appirest5.addopinion)
usershow.route('/opinion/casa/:id')
.get(appirest5.findOpinionById)
.put(appirest5.updateOpinion)
.delete(appirest5.deleteOpinion);



app.use('/api', usershow);



////opiniones coche



mongoose.connect('mongodb://localhost/appii', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }else
console.log(' connected to Database. ');
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});

///authorization 







///module.exports = app;  esa era 



//metodo put
//curl -v -H "Content-Type:application/json" -X PUT http://localhost:3000/api/items -d '{"_id":2, "nombre":"FRANCE", "identify": 4, "ciudad1_1": "Paris","ciudad1_2":"Nancy","ciudad1_3":"Monpellier"}'

//hacer un post
//curl -d '{"_id":5, "nombre":"BELGICA", "identify": 4, "ciudad1_1": "Bruselas","ciudad1_2":"Lieja","ciudad1_3":"Gank"}' -H "Content-Type:application/json" -v http://localhost:3000/api/items


//metodo delete
//curl -X DELETE -v http://localhost:3000/api/items/1 

//metodo get

//curl -v http://localhost:3000/api/items


//curl -d '{"_id":1, "nombre":"yo","age":20,"matricula":"XAAA", "modelo":"BMW", "color":"Rojo"}' -H "Content-Type:application/json" -v //http://localhost:3000/api/items








