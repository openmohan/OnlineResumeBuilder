var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/testDB';
var userTable = "testTable" ;

//function to get Specific User data
exports.getUserData = function(id,callback){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	   db.collection(userTable).find({name:id}).toArray(function(err,objs){
	   	console.log(objs)
	  	callback(null,JSON.stringify(objs))
	  });
	})
}

//function to get all user data
exports.getAllUserData = function(callback){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	   db.collection("testTable").find().toArray(function(err,objs){
	   	console.log(objs)
	  	callback(null,JSON.stringify(objs))
	  });
	})
}
