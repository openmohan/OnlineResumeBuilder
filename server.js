var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/testDB';

var insertDocument = function(db, callback) {
	var users = [];
	for(var i = 0;i<10000;i++){
		var user = {name:"mohan"+i , age:i , cars : "lambo"+i}
		users.push(user)
	}
	db.collection('testTable').insert(users,function(err,result){assert.equal(err,null);callback();})
};



app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/insertBunchData',function(req,res){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insertDocument(db, function() {
	      res.send("inserted")
	  });
	});
})

app.get('/getData',function(req,res){
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	   db.collection('testTable').find({name:"mohan9944"}).toArray(function(err,objs){
	  	res.send(JSON.stringify(objs))
	  });
	 //  var data = []
	 //  console.log(cursor)

	 //  cursor.each(function(err, doc,cb) {
	 //  		assert.equal(err, null);
	 //  		console.log(cursor)
		// })
	});

})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

