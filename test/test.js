

var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");




//test post
var id1=0;
describe("SAMPLE unit test",function(){

  it("post test",function(done){

 
    server
    .post('/api/user')

    .send({ nif:"OFF87", name: "example", age: 33})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      res.body.nif.should.equal("OFF87");
      res.body.name.should.equal("example");
      id1=res.body._id;
console.log(id1);
      done();
    });
  });

});



// test get

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/api/user/id/"+id1)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.nif.should.equal("OFF87");
      done();
    });
  });

});



//test put
describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

 
    server
    .put('/api/user/id/'+id1)
    .send({ nif:"OFF87", name: "loquesea", age: 33})
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      //res.body.name.should.equal("loquesea");
      //res.body.nif.should.equal("OFF87");
      done();
    });
  });

});

//test delete
describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

    //calling ADD api
    server
    .delete('/api/user/id/'+id1)
    
   
    .expect(200)
    .end(function(err,res){
      done();
    });
  });

});



///pruebas sobre coche

var id2=0;
describe("SAMPLE unit test",function(){

  it("post test",function(done){

 
    server
    .post('/api/user')

    .send({ nif:"8810", name: "example", age: 33})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      res.body.nif.should.equal("8810");
      res.body.name.should.equal("example");
      id2=res.body._id;

      done();
    });
  });

});

var id3=0;
//test post
describe("SAMPLE unit test",function(){

  it("post test",function(done){

 
    server
    .post('/api/car')

    .send({"_creator":id2,matricula:"RRR8",modelo:"C3",color:"blue",precio:6000})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      id3=res.body._id;
    console.log(res.body._id);
      done();
    });
  });

});

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/api/car/id/"+id3)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.matricula.should.equal("RRR8");
      done();
    });
  });

});

//test put

describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

 
    server
    .put('/api/car/id/'+id3)
    .send({matricula:"Q222",modelo:"C6",color:"azul",precio:2000})
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
     // res.body.precio.should.equal(2000);
      //res.body.matricula.should.equal("Q222");
       done();
    });
  });

});

//test delete
describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

    //calling ADD api
    server
    .delete('/api/car/id/'+id3)
    
   
    .expect(200)
    .end(function(err,res){
      done();
    });
  });

});


describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

    //calling ADD api
    server
    .delete('/api/user/id/'+id2)
    
   
    .expect(200)
    .end(function(err,res){
      done();
    });
  });

});



/////test sobre la tabla casas

var id4=0;
describe("SAMPLE unit test",function(){

  it("post test",function(done){

 
    server
    .post('/api/user')

    .send({ nif:"8810", name: "example", age: 33})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      res.body.nif.should.equal("8810");
      res.body.name.should.equal("example");
      id4=res.body._id;

      done();
    });
  });

});


var id5=0;
//test post
describe("SAMPLE unit test",function(){

  it("post test",function(done){

 
    server
    .post('/api/house')

    .send({"_creator":id4,zona:"Merzouga",precio:22,telefono:"3210",observacion:"observacion"})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      id5=res.body._id;
      
      done();
    });
  });

});


// test get

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/api/house/id/"+id5)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.observacion.should.equal("observacion");
      done();
    });
  });

});

//test put

describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

 
    server
    .put('/api/house/id/'+id5)
    .send({zona:"Madrid",precio:220,telefono:"3210",observacion:"observacion"})
    .expect("Content-type",/json/)
    .expect(204)
    .end(function(err,res){
      res.status.should.equal(204);
      //res.body.should.have.property('info');
       done();
    });
  });

});

//test delete
describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

    //calling ADD api
    server
    .delete('/api/house/id/'+id5)
    
   
    .expect(200)
    .end(function(err,res){
      done();
    });
  });

});



//test delete
describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

    //calling ADD api
    server
    .delete('/api/user/id/'+id4)
    
   
    .expect(200)
    .end(function(err,res){
      done();
    });
  });

})



