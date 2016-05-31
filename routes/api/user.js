var express = require('express');
var router = express.Router();

var User = require('../../models/User');
var Movie = require('../../models/Movie');

//GET: api/user/:username
router.get('/:username', function (req, res, next) {
  User
    .findOne({ username: req.params.username })
    .populate("watchedMovies.movie")
    .exec(function (err, user) {
      if (err) res.send(err);
      res.json(user);
    })
});

//PUT: api/user/:username/watchedMovies
router.put('/:username/watchedMovies', function (req, res, next) {

  Movie.findOne({ id: req.body.id }, function (err, movie) {
    if (err) res.send(err);

    //find user, check if user already watched the movie
    User.find({ username: req.params.username, 'watchedMovies.movie': movie._id }, function (err, user) {
      if (user.length > 0) { //movie watched     
        User.update(
          { username: req.params.username, 'watchedMovies.movie': movie._id },
          { $set: { 'watchedMovies.$.time': req.body.time, 'watchedMovies.$.watchedDuration': req.body.watchedDuration }},
          function (err, watchedMovies) {
            if (err) res.send(err);
            res.json(watchedMovies);
          }
        )
      } else { //movie hasn't been watched
        User
          .findOneAndUpdate(
          { username: req.params.username },
          { $push: { 'watchedMovies': { movie: movie._id, time: req.body.time, watchedDuration: req.body.watchedDuration }}},
          function (err, user) {
            if (err) res.send(err);
            res.json(user);
          });
      }
    });
  });

});

module.exports = router;
