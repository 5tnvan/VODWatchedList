var express = require('express');
var router = express.Router();

//GET: api/
router.get('/', function(req, res, next) {
  res.send('/api');
});

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;