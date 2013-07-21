var os = require('os');

exports.extendCore = function(core){
    //some other Cocoo clock
    setInterval(function(){
        core.emit('Coocoo!','Dzin!');
    },5000);
}

//exports.setAppParameters = null;

exports.setAppMiddlewares=function(core){
    core.app.use('/config', function (request, response, next) {
            response.json(
                {
                    'current_time': (new Date().toLocaleString()),
                    'NODE_ENV': process.env.NODE_ENV,
                    'OS':{
                        'hostname':os.hostname(),
                        'arch':os.arch(),
                        'type':os.type(),
                        'platform':os.platform(),
                        'release':os.release(),
                        'NodeJS version':process.version
                    }
                });
            //next(); - there is no any other things to happen later
            //so, the '/config/time' will never be executed
        }
    );
}

exports.extendAppRoutes = function(core){
    core.app.get('/time',function(request,response){
        response.send('Current time is '+(new Date().toLocaleString()));
    });

    //this route is not executed, because it is overlaped by middleware from setAppMiddlewares
    core.app.get('/config/time',function(request,response){
        response.send('Current time is '+(new Date().toLocaleString()));
    });

    //we use Mongoose Model in this route
    core.app.get('/team',function(request,response){
        request.MODEL.Users.find({active:1},function(err,users){
            if(err) throw err;
            response.json({'Team':users});
        });
    });
    //we use exposed Redis client. In a rather stupid way.
    core.app.get('/redis',function(request,response){
        request.redisClient.keys('*',function(err,keys){
            response.json(keys);
        });
    });

    //making mousetrap - when user visits this url, MWC emmits the event
    core.app.get('/honeypot',function(request,response){
        request.emitMWC('honeypot accessed','Somebody with IP of '+request.ip+' accessed the honeypot');
        response.send('Administrator was notified about your actions!');
    });
}



