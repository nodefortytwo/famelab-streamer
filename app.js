/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes');

var app = module.exports = express.createServer();
var nowjs = require("now");
var everyone = nowjs.initialize(app, {
    socketio : {
        transports : ['xhr-polling']
    }
});
// Configuration

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack : true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});
//nowstuff
var usrCnt = 0;

nowjs.on('connect', function() {
    usrCnt++;
    console.log('User Connected');
    console.log('User Count: ' + usrCnt);
});

nowjs.on('disconnect', function() {
    if (usrCnt > 0){
        usrCnt--;
    }
    console.log('User Disconnected');
    console.log('User Count: ' + usrCnt);
});

var init = function(req, res, next){
    req.userCnt = usrCnt;
    next();
};

// Routes
app.get('/', init, routes.index);

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
