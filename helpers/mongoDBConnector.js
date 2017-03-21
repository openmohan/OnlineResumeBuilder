var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbConfigs = require('../configs/DataBaseConfigs')
var url = dbConfigs.DBURL;
var userTable = dbConfigs.userTable;

var state = {
  db : null
}

//function to connect with DB
exports.connect = function(done){
  if(state.db){
    return done()
  }else{
    MongoClient.connect(url,function(err,db){
      assert.equal(null,err);
      state.db = db;
      done();
    })
  }
}

//function to get the DB
exports.get = function(){
  return state.db
}

//function to close the DB connection
exports.close = function(done){
  if(state.db){
    state.db.close(function(err,result){
      state.db = null;
      done(err)
    })
  }
}
