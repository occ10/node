var mongoose = require('mongoose');
var coche = mongoose.model('Coche');
var usuario = mongoose.model('Usuario');
var auth= require('../auth')
//post car user
//curl -d '{"_id":6,"matricula":"XXXX","modelo":"audi","color":"blanco","precio":220}' -H "Content-Type:application/json" -v http://localhost:3000/api/car/:id

exports.addUsersCar = function(pet, res){
    var nuevo = pet.body;
	if(nuevo.matricula==null || nuevo._creator==null){

	res.status(404).jsonp({ info: 'El valor de la matricula y el id no pueden ser nulos' });
	}else{
		 coche.findOne({"matricula":nuevo.matricula}, function(err, story) {
			if(err) return res.send(500, err.message);
			if(story)
				res.status(500).send({ error: 'El coche con ' +nuevo.matricula+' ya esta en la base de datos!' });
		        else{
		             usuario.findById(nuevo._creator, function(err, user) {
				     if(err) return res.send(500, err.message);
				     if(!user)
					res.status(404).send({ error: 'El usuario no existe en la base de datos' });                
				     else{

				    
					    var car = new coche({
			   
						    _creator:nuevo._creator,    // assign the _id from the person
						    matricula: nuevo.matricula,
						    modelo : nuevo.modelo,
						    color  : nuevo.color,
						    precio : nuevo.precio,

					    });
			   
					    car.save(function (err) {

					     if(err) return res.send(500, err.message);
						  //res.status(500).send(err.message) 
					     res.status(201).jsonp(car);

					   });
                                       }
                              
		         

	                     }); 
                         }     
                  }); 		 
	}
  
};

//GET - Devuelve todos los coches
//ruta  /api/user/car
exports.findAllcars =function(req, res) {  

coche.find(function(err, story){

	   if(err) return res.send(500, err.message)
           if(!story)
                res.status(404).send({ error: 'No hay coches en la base de datos!' });
           else
                res.status(200).jsonp(story);

});
};



//Dado un coche devolver el nombre de su dueño
//ruta /api/user/car/matricula/:matricula
exports.findUserCarByMatricula = function(req, res) {  

var matricula=req.params.matricula


if(matricula==null){

	 resp.status(404)
	 resp.send('no existe el item con la matricula '+matricula)
}{

coche.findOne({"matricula" : matricula})
.populate('_creator')
.exec(function (err, story) {
	   if(err) { //res.send(500, "error");return next(new Error('not found!'));
                    res.status(500).send({ error: 'Something failed!' });
           }if(!story){
                res.status(404).send({ error: 'La matricula no existe en la base de datos!' });
           }else
                          //res.status(500).send(err.message) 
           res.status(200).jsonp(story._creator.name);

});
}
};


/////metodos delete/get/update  car

//ruta /api/car/:id
exports.findCarById=function(req, res) {

    var id=parseInt(req.params.id)
console.log(id)
   if (isNaN(id)){
      res.status(400)
      res.end()

   }else{
        coche.findById(id, function(err, story) {
        
         if(!story) //res.status(404).send({error: 'No existe ningun coche con este identificador!'});
                    {res.status(404).send({error: 'No existe ningun coche con este identificador!'});
         }else{
		 if(err) return res.send(500, err.message);
		 else{
		         res.status(200).jsonp(story);
		 }
         }
	});
   }
};




//metodo delete

//DELETE - Delete car
//ruta  curl -X DELETE -v http://localhost:3000/api/car/:id

exports.deleteCar= function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }
   else {
      coche.findById(id, function(err, story) {
       if(!story){
           res.status(404).send({ error: 'El coche con id '+id+' no existe en la base de datos!' });
       }else{
         story.remove(function(err) {
	 if(err) return res.status(500).send(err.message) 
         if(!story)
              res.status(404).send({ info: 'El coche no se ha podido borrar!' });
          else{
            res.status(200).send({ info: 'El coche se ha borrado perfectamente!' });
            
          }
	 })
       }
     });
   }
};





//metodo update car


//ruta curl -v -H "Content-Type:application/json" -X PUT http://localhost:3000/api/user/car/:id -d '{"_id":1,"matricula":"AAAAA","modelo":"C15", "color":"verde", "precio":300}'

exports.updateCar=function(req, res) {  
    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }else{
    coche.findById(id, function(err, car) {
        if(!car){
                res.status(404).send({ error: 'El coche no existe en la base de datos!' });
                res.end();
        }else{
			for (var key in req.body) {
			    if (req.body.hasOwnProperty(key)) {
				car[key] = req.body[key]
			    }
			}

			car.save(function(err,result){
			    if(err)
				return resp.status(500).send(err.message)
			    //res.status(200).send({ info: 'El coche se ha actualizado perfectamente!' });
                            res.status(204).send(result);
			})
            }
     })
}
    
};

//devolver colecciones de coches
//ruta /api/users/collectionCar/:id

exports.collectionCar= function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
         res.status(400)
         res.end()

   }else{
     
	 coche.find()
	    .skip(id)
	    .limit(2)
	    .exec(function (err, car) {
		if(err) { res.status(500).json(err)};
		res.status(200).json(car);
	    
	    });
   }
};


///ruta  /api/usercars/:id
exports.findUserCars = function(req, res) {  
 //console.log('id  %s', req.params.id);
	var id=req.params.id

	coche
	.find({ _creator: id })
	.exec(function (err, coches) {
	  if(err) { res.status(500).json(err)};
	      res.status(200).json(coches);
	})
}
