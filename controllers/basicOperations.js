var express = require('express')
  , router = express.Router()
  , MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , url = 'mongodb://localhost:27017/testDB';

var userData = require('../models/userData')


router.get('/:user',function(req,res){
	userData.getUserData(req.params.user,function(err,userData){res.send(userData)})
})


module.exports = router