var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");






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


var id4=0;
//test post
describe("SAMPLE unit test",function(){

  it("post test",function(done){

 
    server
    .post('/api/user/opinion/coche')

    .send({_user:id2,_car:id3,opinion:"jhkkk"})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      id4=res.body._id;
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
    .get('/opinion/coche/'+id4)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.opinion.should.equal("jhkkk");
      done();
    });
  });

});

//test put

describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

 
    server
    .put('/opinion/coche/'+id4)
    .send({_user:id2,_car:id3,opinion:"jhkk"})
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
    .delete('/opinion/coche/'+id4)
    
   
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



//opinion casa



var id5=0;
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
      id5=res.body._id;

      done();
    });
  });

});
//{"_id":8,"_creator":9,"zona":"madrid","precio":333,"telefono":"9999999","__v":0},
var id6=0;
//test post
describe("SAMPLE unit test",function(){

  it("post test",function(done){

 
    server
    .post('/api/house')

    .send({"_creator":id5,"zona":"madrid","precio":333,"telefono":"9259999"})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      id6=res.body._id;
    console.log(res.body._id);
      done();
    });
  });

});


var id7=0;
//test post
describe("SAMPLE unit test",function(){

  it("post test",function(done){

 
    server
    .post('/api/opinion/casa')

    .send({_user:id5,_casa:id6,opinion:"jhkkk"})
    .expect("Content-type",/json/)
    .expect(201)
    .end(function(err,res){
      res.status.should.equal(201);
      id7=res.body._id;
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
    .get('/opinion/casa/'+id7)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.opinion.should.equal("jhkkk");
      done();
    });
  });

});

//test put

describe("SAMPLE unit test",function(){

  it("should add two number",function(done){

 
    server
    .put('/opinion/casa/'+id7)
    .send({_user:id5,_casa:id6,opinion:"jhkkkkkkkkk"})
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
    .delete('/opinion/casa/'+id7)
    
   
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
    .delete('/house/id/'+id6)
    
   
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
    .delete('/api/user/id/'+id5)
    
   
    .expect(200)
    .end(function(err,res){
      done();
    });
  });

});

