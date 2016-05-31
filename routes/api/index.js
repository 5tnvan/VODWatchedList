var express = require('express');
var router = express.Router();

//GET: api/
router.get('/', function(req, res, next) {
  res.send('/api');
});

router.use('/user', require('./user'));
router.use('/movies', require('./movies'));

module.exports = router;