var mongoose = require('mongoose');

//create a user model
var Problem = mongoose.model('Problem', {
	title : String,
	id : String,
	question : String,
	hints : {
		type : String,
		upperBound : Number,
		lowerBound : Number,
		testCase : {
			contains : Boolean,
			text : String
		},
	},
	maxAttempts : Number,
	answer : Number
});

module.exports = Problem;