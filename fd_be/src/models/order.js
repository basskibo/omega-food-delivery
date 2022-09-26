const mongoose = require("mongoose")
const Schema = mongoose.Schema
const config = require("../config/config")

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		restaurant: {
			type: Schema.Types.ObjectId,
			ref: "Restaurant",
			required: true,
		},
		food: {
			type: Schema.Types.ObjectId,
			ref: "Food",
			required: true,
		},
		orderStartedTime: {
			type: String,
			required: true,
		},
		orderDeliveryTime: {
			type: String,
			required: true,
		},
		delivered: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	{ timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
