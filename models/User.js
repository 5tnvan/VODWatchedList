var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, require: true },
	firstName: String,
	lastName: String,
	gender: Boolean,
	watchedMovies : [{ 
		movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
		time: Date,
		watchedDuration: Number,
	}],
	dateCreated: Date,
	dateUpdated: Date,
})

module.exports = mongoose.model('User', userSchema)