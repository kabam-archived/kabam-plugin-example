var os = require('os');

module.exports = exports = function (app, routeToBind,config) {
    app.use(routeToBind, function (request, response, next) {
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
        }
    )
}
