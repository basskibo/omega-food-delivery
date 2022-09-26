const mongoose = require("mongoose")
const Schema = mongoose.Schema
const config = require("../config/config")

const commentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		food: {
			type: Schema.Types.ObjectId,
			ref: "Food",
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
