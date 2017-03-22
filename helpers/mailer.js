var sendmail = require('sendmail')();

exports.sendmail = sendmail({
    from: 'yoursiteresume@gmail.com',
    to: 'mohanprasathsmart@gmail.com',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
