var express = require('express')
  , router = express.Router()

router.use('/comments', require('./comments'))
router.use('/users', require('./users'))
router.use('/user',require('./basicOperations'))

router.get('/', function(req, res) {
  res.render('index')
})

module.exports = router