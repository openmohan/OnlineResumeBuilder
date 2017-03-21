var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/testDB';
var userTable = "testTable" ;
var db = require('../helpers/mongoDBConnector')

//function to get Specific User data
exports.getUserData = function(id,callback){
	   db.get().collection(userTable).find({name:id}).toArray(function(err,objs){
	   	console.log(objs)
	  	callback(null,JSON.stringify(objs))
	  });
}

//function to get all user data
exports.getAllUserData = function(callback){
	   db.get().collection("testTable").find().toArray(function(err,objs){
	   	console.log(objs)
	  	callback(null,JSON.stringify(objs))
	  });
}
