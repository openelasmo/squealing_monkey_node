//// GET PACKAGES ////
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt		= require('jsonwebtoken');	// used to create, sign, and verify tokens
var config 	= require('./config');		// get our config file

//// CONFIGURATION ////
var port = process.env.PORT || 8080;	// used to create, sign, and verify tokens
mongoose.connect(config.database);		// connect to database
app.set('superSecret', config.secret);	// secret variable

// use body-parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/views"));		//location of index.html (web page)
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

//// ROUTES ////
// basic route
app.get('/', function(req, res){
	res.send('Hello! The API is at http://localhost:' + port + '/api');
})

app.get('/setup', function(req, res){
	// create a sample users
	var John = new User({
		name: "John Bonham",
		password: "ledzep",
		admin: true
	});

	// save the sample user
	John.save(function(err){
		if(err) throw err;
		console.log('User saved successfully');
		res.json({success: true});
	});
});

//get an instance of the router for api routes
//var apiRoutes = express.Router();

// // route to authenticate a user (POST http://localhost:8080/api/authenticate)
// apiRoutes.post('/authenticate', function(req, res){
// 	// find the user
// 	User.findOne({name: req.body.name}, function(err, user){
// 		if(err) throw err;
// 		if(!user){
// 			res.json({success: false, message: 'Authentication failed. User not found.'});
// 		} else if(user){
// 			// check if password matches
// 			if(user.password != req.body.password){
// 				res.json({success: false, message: 'Authentication failed. Wrong password'});			
// 			} else {
// 				// if user is found and password is correct
// 				// create token
// 				var token = jwt.sign(user, app.get('superSecret'), {
// 					expiresInMinutes: 1440 // expires in 24 hours
// 				});

// 				//return the information including token as JSON
// 				res.json({
// 					success: true,
// 					message: 'Enjoy your token!',
// 					token: token
// 				});
// 			}
// 		}
// 	});
// });

// // route middleware to verify a token
// apiRoutes.use(function(req, res, next){

// 	// check header or url parameters or post parameters for toekn
// 	var token = req.body.token || req.query.token || req.headers['x-access-token'];

// 	// decode token
// 	if(token){
// 		//verifies secret and checks exp
// 		jwt.verify(token, app.get('superSecret'), function(err, decoded){
// 			if(err){
// 				return res.json({success: false, message: 'Failed to authenticate token.'});
// 			} else {
// 				// if everything is good, save to request for use in other routes
// 				req.decoded = decoded;
// 				next();
// 			}
// 		});
// 	} else {
// 		// if there is no token, return an error
// 		return res.status(403).send({
// 			success: false,
// 			message: 'No token provided.'
// 		});
// 	}
// });

// API ROUTES


// apply the routes to our application with the prefix /api
var apiRoutes = require('./routes/apiRoutes')
app.use('/api', apiRoutes);

//// START THE SERVER ////
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

module.exports = app;