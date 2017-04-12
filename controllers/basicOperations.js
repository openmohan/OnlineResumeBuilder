var express = require('express')
  , router = express.Router()
  , MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , url = 'mongodb://localhost:27017/testDB';

var userData = require('../models/userData')


router.get('/:user',function(req,res){
	userData.getUserData(req.params.user,function(err,userData){res.send(userData)})
})

router.get('/user/all',function(req,res){
	userData.getAllUserData(function(err,userData){res.send(userData)})
})

router.post('/user/put',function(req,res){
  userData.putUserData(req.body,function(err,result){res.send(result)})
})

router.get('/checkUser/:user',function(req,res){
  userData.checkUser(req.params.user,function(err,result){
    res.setHeader('Content-Type', 'application/json');
    res.send(result)})
})

module.exports = router
