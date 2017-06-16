


var mongoose = require('mongoose');
var models1     = require('../models/usuario');
var models2     = require('../models/coche');
var models3     = require('../models/casa');
var usuario = mongoose.model('Usuario');
var coche = mongoose.model('Coche');
var house = mongoose.model('Casa');

var auth= require('../auth')
var service = require('../service');

//"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlhdCI6MTQ3NzczMDAyOCwiZXhwIjoxNDc4OTQzMjI4fQ.Z7COE7WqmCh0iKcY3K2jR1wHXtqK12xWrplmuwA1PMU"


/////metodo que comprueba el login
exports.login = function(req, res) {  

    var nuevo = req.body;
console.log(nuevo);
var login=nuevo.login;
var password=nuevo.password;
console.log(login+" "+password);
	if(login==null || password==null)
	{
		res.status(403).send({ error: 'El nif y el nombre no pueden ser nulos' });
		res.end();
	}else if (login!= 'chamit' || password != 'occ10'){

		res.status(403).send({ error:'Los datos no son correctos' });
		res.end();
	}else{
console.log("respuesta correcta");

	        res.status(200).jsonp();

	}
};



exports.findAllusers = function(req, res) {  

usuario.find(function(err, story){

	   if(err) return res.send(500, err.message);
           if(!story)
                res.status(404).send({ error: 'No hay usuarios en la base de datos!' });
           res.status(200).jsonp(story);

});
};


exports.addUsers = function(pet, res){
    var nuevo = pet.body;
console.log("hola");
var nif=nuevo.nif;
var nombre=nuevo.name;
if(nif==null || nombre==null)
{
res.status(404).send({ error: 'El nif y el nombre no pueden ser nulos' });
res.end();
}else{

    
    usuario.findOne({"nif":nif}, function(err, story) {
		if(err) return res.send(500, err.message);
		if(story)
		        res.status(500).send({ error: 'El usuario con nif '+nif+' ya esta en la base de datos!' });
		else{
		     var user = new usuario({
			     
			     nif: nif,
			     name: nuevo.name,
			     age:nuevo.age	     
		     });

			user.save(function(err, user) {
			   if(err) return res.send(500, err.message);
				          //res.status(500).send(err.message) 
			  // res.status(200).jsonp({ info: 'El usuario con nif '+nif+' se ha insertado correctamente en la base de datos!' });              
                          console.log(user);
                          res.status(201).jsonp(user);

                          // res.send({token: service.createToken(user)});
	           
			}); 
	        }          
	 });

}

};


//ruta /api/user/nif/:nif
exports.findByNif=function(req, res) {

    var nif=req.params.nif;

   if (nif==null){
      res.status(404)
      res.end()

   }else{
        usuario.findOne({"nif":nif}, function(err, story) {
        if(err) return res.send(500, err.message);
           res.status(200).jsonp(story);
          //res.send({token: service.createToken(user)});
	});
   }
}



//encontrar usuario by id

//ruta /api/user/:id
exports.findById=function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }else{
        usuario.findById(req.params.id, function(err, story) {
        if(err) return res.send(500, err.message);
           console.log(story)
           res.status(200).jsonp(story);
           console.log(story)
          //res.send({token: service.createToken(user)});
	});
   }
}

//Delete un usuario
/*
  .get(appirest.findById)
  .put(appirest.updateuser)
  .delete(appirest.deleteUser);
*/
//DELETE - Delete a user with specified ID

// ruta  curl -X DELETE -v http://localhost:3000/api/user/:id

exports.deleteUserById= function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }
   else {
      usuario.findById(id, function(err, story) {
	   if(err) return res.send(500, err.message);
           if(!story)
                res.status(404).send({ error: 'No hay usuarios en la base de datos con el id '+ id });
           else {
	       story.remove(function(err) {
		 if(err) 
		      return res.status(500).send(err.message)
		 if(!story)
		      res.status(404).send({ info: 'El usuario no se ha podido borrar!' });
		  else{
		    res.status(200).send({ info: 'El usuario se ha borrado perfectamente!' });
		    
		  }
		 })
	    
           }
       });
   }
};

//DELETE - Delete a user with specified NIF

// ruta  curl -X DELETE -v http://localhost:3000/api/user/nif/:nif
exports.deleteUserByNif= function(req, res) {

    var nif=req.params.nif;

   if (nif==null){
      res.status(400).send({ info: 'Debes incluir un nif' })
      

   }
   else {
       usuario.findOne({"nif":nif}, function(err, story) { 
	   if(err) return res.send(500, err.message);
           if(!story)
                res.status(404).send({ error: 'No hay usuarios en la base de datos con el nif '+ nif });
           else {
	       story.remove(function(err) {
		 if(err) 
		      return res.status(500).send(err.message)
		 if(!story)
		      res.status(404).send({ info: 'El usuario no se ha podido borrar!' });
		  else{
		    res.status(200).send({ info: 'El usuario se ha borrado perfectamente!' });
		    
		  }
		 })
	    
           }
       });
   }
};


//put user by id
//ruta  curl -v -H "Content-Type:application/json" -X PUT http://localhost:3000/api/user/:id -d '{"_id":18,"nif":"C3333", "name":"ouadi", "age": 35}'

exports.updateUserById=function(req, res) {  



    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }else{
     
    usuario.findById(id, function(err, user) {
                 if(err) return res.send(500, err.message);
                 if(!user)
                    res.status(404).send({ error: 'No hay usuario en la base de datos co id '+ id });
                 else{
			for (var key in req.body) {
			    if (req.body.hasOwnProperty(key)) {
				user[key] = req.body[key]
			    }
			}

			user.save(function(err,result){
			    if(err)
				return resp.status(500).send(err.message)
			    //res.status(200).send({ info: 'El usuario se ha actualizado perfectamente!' });
                              res.status(204).send({ info: 'El usuario se ha actualizado perfectamente!' });
			})
		       }
     })
}
};



//put user by nif

exports.updateUserByNif=function(req, res) {  



    var nif=req.params.nif

       usuario.findOne({"nif":nif}, function(err, user) { 
	   if(err) return res.send(500, err.message);
           if(!user)
                res.status(500).send({ error: 'No hay usuarios en la base de datos con el nif '+ nif });
           else {
			for (var key in req.body) {
			    if (req.body.hasOwnProperty(key)) {
				user[key] = req.body[key]
			    }
			}

			user.save(function(err){
			    if(err)
				return resp.status(500).send(err.message)
			    res.status(204).send({ info: 'El usuario se ha actualizado perfectamente!' });
			})
            }
     })

};

//devolver collections
//ruta /api/users/collectionUser/:id
exports.collectionUser= function(req, res) {
    var id=parseInt(req.params.pagina)
    var tamPagina=parseInt(req.params.TamPagnia)
    //var id=parseInt(req.params.id)
    //var tamPagina=2;

   if (isNaN(id)){
      res.status(400)
      res.end()

   }else{
     
 usuario.find()
    .skip(id)
    .limit(tamPagina)
    .exec(function (err, user) {
        if(err) { res.status(500).json(err); return; };
        res.status(200).json(user);
    
    });
   }
};


