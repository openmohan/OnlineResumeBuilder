var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 3000,
  db = require("./helpers/mongoDBConnector");

// app.set('views', __dirname + '/views')
// app.engine('jade', require('jade').__express)
// app.set('view engine', 'jade')

// app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(require("./controllers"));

db.connect(function(err) {
  if (err) {
    console.log("cant connec to DB");
  } else {
    app.listen(port, function() {
      console.log("Listening on port " + port);
    });
  }
});

//Source - https://www.terlici.com/2014/09/29/express-router.html
