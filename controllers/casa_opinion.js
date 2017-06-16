var mongoose = require('mongoose');
var opinion     = require('../models/casa_opinion');
var usuario     = require('../models/usuario');
var house     = require('../models/casa');



//GET - Devuelve todos los opiniones

//ruta  /api/user/opinionsCasa
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
//curl -d '{"user":3,"casa":0, "opinion":"buena casa esta en la playa"}' -H "Content-Type:application/json" -v http://localhost:3000/api/opinionCasa/:id
exports.addopinion = function(pet, res){
    var nuevo = pet.body;


   if(nuevo._user==null || nuevo._casa==null || nuevo.opinion==null){

      res.status(400).send({ error: 'debes poner tanto el usuario como el id de la casa y la opinion' });
      res.end()
}else{
         house.findById(nuevo._casa, function(err, c) {
		if(err) return res.send(500, err.message);
		if(!c)
		    res.status(404).send({ error: 'La casa con id '+nuevo._casa+' no esta en la base de datos!' });
                else{
                         usuario.findById(nuevo._user, function(err, u) {
		             if(err) return res.send(500, err.message);
		             if(!u)
		                res.status(404).send({ error: 'El usuario con id '+nuevo._user+' no esta en la base de datos!' });
                            else{

				         var op = new opinion({

					     _user:u._id,
				             _casa:c._id,
					     opinion : nuevo.opinion
			     
					});

					op.save(function(err, result) {
					   if(err) return res.status(500).send(err.message);//res.send(500, err.message);
							  //res.status(500).send(err.message) 
					   res.status(201).jsonp(result); 
				          // res.send({token: service.createToken(user)});
				   
					});
                             }          
                          });
                }
        });

}
};


//encontrar opinion por id
//ruta /api/opinionCasa/:id
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
//ruta curl -X DELETE -v http://localhost:3000/api/opinionCasa/:id

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
       story.remove(function(err) {
	 if(err) return res.status(500).send(err.message) 
         if(!story)
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
//ruta  curl -v -H "Content-Type:application/json" -X PUT http://localhost:3000/api/opinionCasa/:id -d '{"_id":1,"opinion":"comportamiento bueno"}'
exports.updateOpinion=function(req, res) {  

var id=parseInt(req.params.id)
var user=req.body._user;
var car=req.body._casa;
var op=req.body.opinion;

   if(id==null || user==null || car==null || op==null){

      res.status(404).send({ error: 'debes poner tanto el id de la opinion a actualizar como el id de la casa y el id del usuario y la opinion' });
      res.end()
}else if (isNaN(id)){
      res.status(400).send({ error: 'debes poner un numero intero del id al que quieres modificar' });
      res.end()

}else{
    opinion.findById(id, function(err, op) {
           if(!op){
                res.status(404).send({ error: 'La casa no existe en la base de datos!' });
                res.end();
           }  else{           
		//op._id=id;
		op._user=op._user;
		op._car=op._casa;
		op.opinion   = req.body.opinion;


                op.save(function(err) {
                if(err) return res.status(500).send(err.message);
                res.status(204).jsonp(op);
        });
       }
    });
}
};





//devolver colecciones de opiniones de casas
//ruta /api/collectionOpinionCasa/:id

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





///ruta  /api/useropinionCasa/:id
exports.findUserOpinions = function(req, res) {  


 
var id=req.params.id
         usuario.findById(id, function(err, story) {
		if(err) return res.send(500, err.message);
		if(!story)
		        res.status(404).send({ error: 'El usuario con id '+id+' no esta en la base de datos!' });
                else{

			opinion
			.find({ _user: story })
			.exec(function (err, casa) {
			  if(err) { res.status(500).json(err)};
			      res.status(200).json(casa);
			})
                }
          });
}
