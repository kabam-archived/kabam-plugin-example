var os = require('os');

module.exports = exports = function (MWC) {


    //setting up the middleware
    MWC.app.use('/config', function (request, response, next) {
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
            //so, the '/example/time' will never be executed
        }
    );

    //this route is not executed, because it is overlaped by middleware above
    MWC.app.get('/config/time',function(request,response){
        response.send('Current time is '+(new Date().toLocaleString()));
    });

    //but this route is executed
    MWC.app.get('/time',function(request,response){
        response.send('Current time is '+(new Date().toLocaleString()));
    });

    //setting index
    MWC.app.get('/',function(req,res){
        res.send('<html>' +
            '<head>MyWebClass Core Example</head>' +
            '<body>' +
            '<p>Hello, friend! You can do this things:</p><ul>' +
            '<li>See current <a href="/time">time</a>.</li>' +
            '<li>See <a href="/team">team</a> on this server.</li>' +
            '<li>See all <a href="/redis">redis</a> keys stored.</li>' +
            '<li>See this server <a href="/config">parameters</a>.</li>' +
            '<li>See users <a href="/api/users">api endpoint</a> on this server.</li>' +
            '<li>See <a href="/plugins">plugins</a> installed on this server.</li>' +
            '<li><a href="/honeypot">Notify</a> admin of your presense.</li>'+
            '<li>See this application <a href="https://github.com/mywebclass/mwc_plugin_example">source on Github</a></li>' +
            '</ul></body>' +
            '</html>');
    });

    //we use Mongoose Model in this route
    MWC.app.get('/team',function(request,response){
        request.MODEL.Users.find({active:1},function(err,users){
           if(err) throw err;
           response.json({'Team':users});
        });
    });
    //we use exposed Redis client. In a rather stupid way.
    MWC.app.get('/redis',function(request,response){
       request.redisClient.keys('*',function(err,keys){
           response.json(keys);
       });
    });

    //making mousetrap - when user visits this url, MWC emmits the event
    MWC.app.get('/honeypot',function(request,response){
       request.emitMWC('honeypot accessed','Somebody with IP of '+request.ip+' accessed the honeypot');
       response.send('Administrator was notified about your actions!');
    });

    // making mechanical clock with artifical bird in it)
    // MWC emits event of 'coocoo' with current time every 5 seconds
    setInterval(function(){
        MWC.emit('Coocoo!','Time now is '+(new Date().toLocaleTimeString()));
    },5000);
}
