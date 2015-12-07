var express = require('express');
var apiRoutes = express.Router();
var jwt		= require('jsonwebtoken');	// used to create, sign, and verify tokens

var mongoose = require('mongoose');
var User = require('../app/models/user');	// get our mongoose model

var app = require('../server')
var app = express();
var config 	= require('../config');
app.set('superSecret', config.secret);	// secret variable

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
/*
apiRoutes.post('/authenticate', function(req, res){
	// find the user
	User.findOne({email: req.body.email}, function(err, user){
		if(err) throw err;
		if(!user){
			res.json({success: false, message: 'Authentication failed. User not found.'});
		} else if(user){
			// check if password matches
			if(user.password != req.body.password){
				res.json({success: false, message: 'Authentication failed. Wrong password'});			
			} else {
				// if user is found and password is correct
				// create token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				//return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next){

	// check header or url parameters or post parameters for toekn
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if(token){
		//verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded){
			if(err){
				return res.json({success: false, message: 'Failed to authenticate token.'});
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// if there is no token, return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});
*/

// route to show a random message (GET http://localhost:8080/api)
apiRoutes.get('/', function(req, res){
	res.json({message: 'Welcome to the coolest API on Earth!'});
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res, next){
	User.find({}, function(err, users){
		if(err) return next(err);
		res.json(users);
	});
});

// route to return user from id (GET http://localhost:8080/api/users/:id)
apiRoutes.get('/users/:id', function(req, res, next){
	console.log(req.params.id);
	User.findById(req.params.id, function(err, user){
		if(err) return next(err);
		res.json(user);
	});
});

// route to create new user (POST http://localhost:8080/api/users)
apiRoutes.post('/users', function(req, res, next){
	console.log(req.body);
	User.create(req.body, function(err, user){
		if(err) return next(err);
		res.json(user);
	});
});

// route to update user by id (PUT http://localhost:8080/api/users/:id)
apiRoutes.put('/users/:id', function(req, res, next){
	console.log(req.params.id);
	User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
		if(err) return next(err);
		res.json(user);
	});
});

// route to delete user by id (DELETE http://localhost:8080/api/users/:id)
apiRoutes.delete('/users/:id', function(req, res, next){
	User.findByIdAndRemove(req.params.id, req.body, function(err, user){
		if(err) return next(err);
		res.json(user);
	});
});



module.exports = apiRoutes;