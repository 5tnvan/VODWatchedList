var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
	id: { type: String, require: true },
	title: String,
	description: String,
	content: {
		videoUrl: String,
		imageUrl: String,
	},
	dateCreated: Date,
	dateUpdated: Date,
})

module.exports = mongoose.model('Movie', movieSchema)