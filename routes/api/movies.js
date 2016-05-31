var express = require('express');
var router = express.Router();

var Movie = require('../../models/Movie');

//GET: api/movies
router.get('/', function(req, res, next) {
  Movie.find(function (err, movies){
    if(err) res.send(err);
    res.json(movies);        
  });
});

module.exports = router;