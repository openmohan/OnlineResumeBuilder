var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbConfigs = require('../configs/configs/DataBaseConfigs')
var url = dbConfigs.DBURL;
var userTable = dbConfigs.userTable;

var state = {
  db : null
}

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
