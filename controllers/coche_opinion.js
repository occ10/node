var mongoose = require('mongoose');
var models1     = require('../models/coche_opinion');
var usuario = mongoose.model('Usuario');
var opinion = mongoose.model('OpinionCoche');
var coche = mongoose.model('Coche');



//GET - Devuelve todos los opiniones
//curl -v http://localhost:3000/api/user/opinionsCoche
//ruta  /api/user/opinionsCoche
exports.findAllopinions = function(req, res) {  

opinion.find(function(err, story){
          
	   if(err){ return res.send(500, err.message);
           }if(!story){
                res.status(404).send({ error: 'No hay opiniones en la base de datos!' });
           }else
                          //res.status(500).send(err.message) 
                res.status(200).jsonp(story);
           
});
};


//metodo post
//curl -d '{"user":3,"car":3, "opinion":"buen coche"}' -H "Content-Type:application/json" -v http://localhost:3000/api/opinionCoche/5
exports.addopinion = function(pet, res){
    var nuevo = pet.body;


   if(nuevo._user==null || nuevo._car==null || nuevo.opinion==null){

      res.status(404).send({ error: 'debes poner tanto el usuario como el coche y la opinion' });
      res.end()
}else{

         coche.findById(nuevo._car, function(err, c) {
		if(err) return res.send(500, err.message);
		if(!c)
		    res.status(404).send({ error: 'El coche con id '+nuevo.car+' no esta en la base de datos!' });
                else{
                         usuario.findById(nuevo._user, function(err, u) {
		             if(err) return res.send(500, err.message);
		             if(!u)
		                res.status(404).send({ error: 'El usuario con id '+nuevo.user+' no esta en la base de datos!' });
                             else{
				         var op = new opinion({
					     _user:u._id,
				             _car:c._id,
					     opinion : nuevo.opinion
			     
					});

					op.save(function(err, op) {
					   if(err) return res.status(500).send(err.message);//res.send(500, err.message);
							  //res.status(500).send(err.message) 
					   res.status(201).jsonp(op); 
				          // res.send({token: service.createToken(user)});
				   
					});
                             }          
                          });
                }
        });

}
};

//ruta  /api/userOpinion/:op
/*exports.findUserOpinion = function(req, res) {  

var op=req.params.op
//try{
opinion.findOne({ opinion:op })
.populate('_creator')
.exec(function (err, story) {
	   if(err) { res.status(500).send({ error: 'Something failed!' });
//res.status(400).json({success: false, msg: mongooseErrorHandler.set(error, req.t)});
           }if(!story){
                res.status(500).send({ error: 'la opinion no pertenece a ningun usuario!' });
           }else
                          //res.status(500).send(err.message) 
           res.status(200).jsonp(story._creator.name);

});

};*/





//encontrar opinion por id
//ruta /api/opinionCoche/:id
exports.findOpinionById=function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }else{
        opinion.findById(req.params.id, function(err, story) {
        if(err){ return res.send(500, err.message);
        
         }if(!story){
                res.status(404).send({ error: 'No existe ningun opinion con este identificador!' });
        }else
           res.status(200).jsonp(story);
	});
   }
};




//DELETE - Delete opinion
//ruta curl -X DELETE -v http://localhost:3000/api/opinionCoche/:id

exports.deleteOpinion= function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }
   else {
      opinion.findById(id, function(err, story) {
          if(!story){
           res.status(404).send({ error: 'La opinion con id '+id+' no existe en la base de datos!' });
         }else{
       story.remove(function(err,result) {
	 if(err) return res.status(500).send(err.message) 
         if(!result)
            res.status(404).send({ info: 'La opinion no se ha podido borrar!' });
          else{
            res.status(200).send({ info: 'La opinion se ha borrado perfectamente!' });
            
          }
	 })
     }
     });
   
   }
};





//update opinion
//ruta  curl -v -H "Content-Type:application/json" -X PUT http://localhost:3000/api/opinionCoche/:id -d '{"_id":1,"opinion":"comportamiento bueno"}'

exports.updateOpinion=function(req, res) {  
    var id=parseInt(req.params.id)
var user=req.body._user;
var car=req.body._car;
var op=req.body.opinion;

   if(id==null || user==null || car==null || op==null){

      res.status(404).send({ error: 'debes poner tanto el id de la opinion a actualizar como el id del coche y el id del usuario y la opinion' });
      res.end()
}else if (isNaN(id)){
      res.status(400).send({ error: 'debes poner un numero intero del id al que quieres modificar' });
      res.end()

}else{


	    opinion.findById(id, function(err, op) {
		         if(err) return res.send(500, err.message);
		         if(!op)
		            res.status(404).send({ error: 'No hay opinion en la base de datos con id '+id });
		         else{

		usuario.findById(user, function(err, story) {
		   if(err) return res.send(500, err.message);
		   if(!story)
		        res.status(404).send({ error: 'No hay usuarios en la base de datos con el id '+ req.body._user });
		   else { 

				     coche.findById(car, function(err, car) {
					if(!car){
						res.status(404).send({ error: 'El coche no existe en la base de datos!' });
						res.end();
					}else{                                            

						for (var key in req.body) {
						    if (req.body.hasOwnProperty(key)) {
							op[key] = req.body[key]
						    }
						}

						op.save(function(err){
						    if(err) return res.status(500).send(err.message)
						    res.status(204).send({ info: 'La opinion se ha actualizado perfectamente!' });
						    
						})
                                        }
                                     });
		   }
	         });
			  }//fin else
	     })
}


};





//devolver colecciones de casas
//ruta /api/users/collectionOpinionCoche/:id

exports.collectionOpinions= function(req, res) {

    var id=parseInt(req.params.id)

   if (isNaN(id)){
      res.status(400)
      res.end()

   }else{
     
 opinion.find()
    .skip(id)
    .limit(2)
    .exec(function (err, op) {


 
        if(err) { 
            return res.status(500).json(err);  
        }
        else
            res.status(200).json(op);
    
    });
   }
};





///ruta  /api/useropinionCoche/:id
exports.findUserOpinions = function(req, res) {  
var id=req.params.id
         usuario.findById(id, function(err, story) {
		if(err) return res.send(500, err.message);
		if(!story)
		        res.status(404).send({ error: 'El usuario con id '+id+' no esta en la base de datos!' });
                else{

			opinion
			.find({ _user: story })
			.exec(function (err,result) {
			  if(err) { res.status(500).json(err)};
			      res.status(200).json(result);
			})
                }
          });
}



//ruta  /api/userOpinionCocheNif/:id
exports.findUserOpinionNif = function(req, res) {  

var id=req.params.id
//try{
opinion.findOne({ _id:id })
.populate('_user')
.exec(function (err, story) {
	   if(err) { res.status(500).send({ error: 'Something failed!' });
//res.status(400).json({success: false, msg: mongooseErrorHandler.set(error, req.t)});
           }if(!story){
                res.status(404).send({ error: 'la opinion no pertenece a ningun usuario!' });
           }else
                          //res.status(500).send(err.message) 
           res.status(200).jsonp(story._user.nif);

});

};
