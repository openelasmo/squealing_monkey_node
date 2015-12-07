var express = require('express');
var apiRoutes = express.Router();
var jwt		= require('jsonwebtoken');	// used to create, sign, and verify tokens

var mongoose = require('mongoose');
var User = require('../app/models/user');	// get our mongoose model





module.exports = apiRoutes;