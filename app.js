// dependencies
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');

var oauth = require('./oauth.js');
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('./model/user.js');
var authentication = require('./routes/authentication');


var app = express();
mongoose.connect('mongodb://localhost');

//all environments
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.methodOverride());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	
	app.use(passport.initialize());
	app.use(passport.session());
	
	app.use(app.router);
	
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('#/home',authentication.ensureAuthenticated, routes.home);

app.get('/id', function (req, res) {
	res.end("Andy");
});

// Setup routes for login with Facebook
authentication.setup(app, passport);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
