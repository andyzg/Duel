var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/user.js');
var oauth = require('../oauth.js');

// Authenticates users using a Facebook account and OAuth 2.0 tokens
module.exports.setup = function(app, passport) {
	
	//serialize and deserialize
	passport.serializeUser(function(user, done) {
		console.log('serializeUser: ' + user._id);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user){
			console.log(user);
			if(!err) {
				done(null, user);
			}
			else {
				done(err, null);
			}
		});
	});
	
	passport.use(new FacebookStrategy({
			clientID: oauth.facebook.clientID,
			clientSecret: oauth.facebook.clientSecret,
			callbackURL: oauth.facebook.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({ oauthID: profile.id }, function(err, user) {
				if(err) { console.log(err); }
				if (!err && user !== null) {
					console.log(user);
					done(null, user);
				} 
				else {
					var user = new User({
						oauthID: profile.id,
						name: profile.displayName,
						created: Date.now()
					});
					user.save(function(err) {
					    if(err) {
					      console.log(err);
					    } else {
					      console.log("saving user ...");
					      done(null, user);
					    };
					});
				}
			});
		}
	));

	//Redirect the user to Facebook for authentication.  When complete,
	//Facebook will redirect the user back to the application at
	//  /auth/facebook/callback
	app.get('/auth/facebook', passport.authenticate('facebook'));

	//Facebook will redirect the user to this URL after approval.  Finish the
	//authentication process by attempting to obtain an access token.  If
	//access was granted, the user will be logged in.  Otherwise,
	//authentication has failed.
	app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { successRedirect: '#/home',
	                                   failureRedirect: '/login' }));
	// route to see if user is logged in
	app.get('/loggedin', passport.authenticate('facebook'), function(req, res) {
		res.send(req.isAuthenticated? req.user : '0');
	});

	app.get('/login', function(req, res) {
		res.send(req.user);
	});

	// route to logout
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
		res.send(200);
	});
}

//test authentication
exports.ensureAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect("/");
};