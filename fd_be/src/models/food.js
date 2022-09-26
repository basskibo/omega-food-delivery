const mongoose = require("mongoose"),
	Schema = mongoose.Schema
// config = require("../config/config")

const foodSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		picture: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		rating: {
			type: Number,
			set: function (num) {
				return Math.round(num)
			},
			default: 0,
		},
	},
	{ timestamps: true }
)

const Food = mongoose.model("Food", foodSchema)

module.exports = Food
