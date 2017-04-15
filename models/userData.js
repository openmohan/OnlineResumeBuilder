var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/testDB';
var userTable = "testTable" ;
var db = require('../helpers/mongoDBConnector')

//function to get Specific User data
exports.getUserData = function(id,callback){
	   db.get().collection(userTable).find({resumeid:id}).toArray(function(err,objs){
	   	console.log(objs)
	  	callback(null,JSON.stringify(objs))
	  });
}

//function to get Specific User data by ID
exports.getUserDataById = function(id,callback){
	   db.get().collection(userTable).find({id:id},{_id:0}).toArray(function(err,objs){
	  	callback(null,(objs))
			console.log(objs)
	  });
}

//function to get all user data
exports.getAllUserData = function(callback){
	   db.get().collection(userTable).find().toArray(function(err,objs){
	   	console.log(objs)
	  	callback(null,JSON.stringify(objs))
	  });
}

//function to push one member data
exports.putUserData = function(object,callback){
	console.log(object);
	console.log("******______________&&&&&&&&&&")
	db.get().collection(userTable).update({"id":object.id},object,{upsert:true},function(err,result){
		assert.equal(null,err);
		var result = {status:"success",data:object}
		callback(null,result)
	})
}

exports.checkUser = function(id,callback){
	db.get().collection(userTable).find({resumeid:id}).toArray(function(err,objs){
	 console.log(objs)
	 if(objs.length > 0 )
	 callback(null,JSON.stringify({"exists":true}))
	 else
	 callback(null,JSON.stringify({"exists":false}))
 });
}
