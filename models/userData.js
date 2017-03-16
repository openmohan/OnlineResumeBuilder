var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/testDB';


exports.getUserData = function(id,callback){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	   db.collection('testTable').find({name:id}).toArray(function(err,objs){
	  	callback(null,JSON.stringify(objs))
	  });
	})
}