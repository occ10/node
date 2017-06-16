/////////////
var basicAuth = require('basic-auth');
module.exports.basicAuth =  function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };
//var nombre=new Buffer(user.name).toString('base64')
//var password=new Buffer(user.pass).toString('base64')
  if (user.name === 'chamit' && user.pass === 'occ10') {
    return next();
//res.redirect('/api/users');
  } else {
    return unauthorized(res);
  };
};


