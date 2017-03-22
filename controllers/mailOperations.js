var express = require('express')
  , router = express.Router()
  , fs = require('fs')
  , path = require('path');

  var sendmail = require('sendmail')({
    logger: {
      debug: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error
    },
    silent: false,
    dkim: { // Default: False
      privateKey: fs.readFileSync(path.join(__dirname,'/dkim-private.pem'), 'utf8'),
      keySelector: 'mydomainkey'
    },
    devPort: 1025 // Default: False
  })


router.post('/sendMail',function(req,res){
  sendmail({
      from: 'yoursiteresume@gmail.com',
      to: 'mohanprasathsmart@gmail.com',
      subject: 'test sendmail',
      html: 'Mail of test sendmail ',
    }, function(err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
  });
})

module.exports = router
