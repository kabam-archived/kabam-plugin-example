var os = require('os');

exports.extendApp = function(core) {
  core.app.set('Var1', '42');
};

/* jshint unused: vars */
exports.extendMiddleware = function(kabam) {
  return function(request, response, next) {
    response.setHeader('X-KABAM-PLUGIN_EXAMPLE!','THIS ROCKS!');
    next();
  };
};

exports.extendRoutes = function(kabam) {
  kabam.app.get('/time',function(request, response) {
    response.send('Current time is ' + (new Date().toLocaleString()));
  });


  kabam.app.get('/config', function(request, response) {
    response.json(
      {
        'current_time': (new Date().toLocaleString()),
        'NODE_ENV': process.env.NODE_ENV,
        'OS': {
          'hostname':os.hostname(),
          'arch':os.arch(),
          'type':os.type(),
          'platform':os.platform(),
          'release':os.release(),
          'NodeJS version':process.version
        }
      });
  });

  //we use Mongoose Model in this route
  kabam.app.get('/team', function(request, response) {
    request.model.Users.find({active:1}, function(err, users) {
      if (err) { throw err; }
      response.json({'Team':users});
    });
  });
  //we use exposed Redis client. In a rather stupid way.
  kabam.app.get('/redis', function(request, response) {
    request.redisClient.keys('*',function(err, keys) {
      response.json(keys);
    });
  });

  //making mousetrap - when user visits this url, Kabam emmits the event
  kabam.app.get('/honeypot', function(request, response) {
    request.emitKabam('honeypot accessed','Somebody with IP of ' + request.ip + ' accessed the honeypot');
    response.send('Administrator was notified about your actions!');
  });
};
