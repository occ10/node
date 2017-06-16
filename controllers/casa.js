var mongoose = require('mongoose');
var house = mongoose.model('Casa');
var usuario = mongoose.model('Usuario');



//GET - Devuelve todos los casas

//ruta  /api/user/house
exports.findAllhouses = function(req, res) {  


house.find(function(err, story){
          
	   if(err){ return res.status(500).send(err.message) ;
           }if(!story){
                res.status(404).send({ error: 'No hay casas en la base de datos!' });
           }else 
                res.status(200).jsonp(story);
           
});
};

//post house user
//curl -d '{"_id":6,"zona":"Torrevieja","precio":22,"telefono":"9632145","observacion":"loque sea"}' -H "Content-Type:application/json" -v http://localhost:3000/api/house/:id


exports.addUsersHouse = function(pet, res){
    var nuevo = pet.body;

         usuario.findById(nuevo._creator, function(err, story) {
		if(err) return res.send(500, err.message);
		if(!story)
		        res.status(404).send({ error: 'El usuario con id '+nuevo._creator+' no esta en la base de datos!' });

               else{

		 house.findOne({"telefono":nuevo.telefono}, function(err, casa) {
			if(err) return res.send(500, err.message);
			if(casa)
				res.status(500).send({ error: 'El telefono no puede ser duplicado!' });
			else{
			      var casa = new house({
		                _creator:story._id,    // assign the _id from the person
				zona        : nuevo.zona,
				precio      : nuevo.precio,
				telefono    : nuevo.telefono,
				observacion : nuevo.observacion,

		              });
		              //console.log('The creator is %s', car);
			      casa.save(function (err) {
		                  if(err) return res.status(500).send(err.message) ;
							  //res.status(500).send(err.message) 
		                  res.status(201).jsonp(casa);

					   //res.status(200)

			      });
			} 
                  });
                 }         
	 });
  
};


//ruta  /api/userHouse/:tel
exports.findUserHouse = function(req, res) {  

var tele=req.params.tel
//try{
house.findOne({ telefono:tele })
.populate('_creator')
.exec(function (err, story) {
	   if(err) { res.status(500).send({ error: 'Something failed!' });
//res.status(400).json({success: false, msg: mongooseErrorHandler.set(error, req.t)});
           }if(!story){
                res.status(404).send({ error: 'El telefono no pertenece a ningun usuario!' });
           }else
                          //res.status(500).send(err.message) 
           res.status(200).jsonp(story._creator.name);

});
//}catch(err){

//res.status(500).send({ error: 'Something failed!' });
//}
};



//encontrar casa por id
//ruta /api/house/:id
exports.findHouseById=function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }else{
        house.findById(req.params.id, function(err, story) {
        if(err){ return res.send(500, err.message);
        
         }if(!story){
                res.status(404).send({ error: 'No existe ninguna casa con este identificador!' });
        }else
           res.status(200).jsonp(story);
	});
   }
};




//DELETE - Delete casa
//ruta curl -X DELETE -v http://localhost:3000/api/house/:id

exports.deleteHouse= function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()



   }
   else {
      house.findById(id, function(err, story) {
          if(!story){
           res.status(404).send({ error: 'La casa con id '+id+' no existe en la base de datos!' });
         }else{
       story.remove(function(err) {
	 if(err) return res.status(500).send(err.message) 
         if(!story)
            res.status(404).send({ info: 'La casa no se ha podido borrar!' });
          else{
            res.status(200).send({ info: 'La casa se ha borrado perfectamente!' });
            
          }
	 })
     }
     });
   
   }
};




//update house
//ruta  curl -v -H "Content-Type:application/json" -X PUT http://localhost:3000/api/user/:id -d '{"_id":18,"zona":"AAA", "telefono":1111, "observacion":"hola a todos"}'
exports.updateHouse=function(req, res) {  
    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()


   }else{
    house.findById(id, function(err, user) {
                 if(err) return res.send(500, err.message);
                 if(!user)
                    res.status(404).send({ error: 'No hay casas en la base de datos con id '+id });
                 else{
			for (var key in req.body) {
			    if (req.body.hasOwnProperty(key)) {
				user[key] = req.body[key]
			    }
			}

			user.save(function(err){
			    if(err) return res.status(500).send(err.message)
			    res.status(204).send({ info: 'La casa se ha actualizado perfectamente!' });
                            
			})
		       }
     })
}

};


//devolver colecciones de casas
//ruta /api/users/collectionHouse/:id

exports.collectionHouse= function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }else{
     
 house.find()
    .skip(id)
    .limit(2)
    .exec(function (err, casa) {


 
        if(err) { 
            return res.status(500).json(err);  
        }
        else
            res.status(200).json(casa);
    
    });
   }
};

///ruta  /api/userhouses/:id
exports.findUserHouses = function(req, res) {  

var id=req.params.id
         usuario.findById(id, function(err, story) {
		if(err) return res.send(500, err.message);
		if(!story)
		        res.status(404).send({ error: 'El usuario con id '+id+' no esta en la base de datos!' });
                else{

			house
			.find({ _creator: story })
			.exec(function (err, casa) {
			  if(err) { res.status(500).json(err)};
			      res.status(200).json(casa);
			})
                }
          });
}



