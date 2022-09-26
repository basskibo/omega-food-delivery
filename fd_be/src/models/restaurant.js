const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cordinatesSchema = Schema({
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
	formattedAddress: String,
})

const restaurantSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		geolocation: cordinatesSchema,
		image: { type: String, required: false },
		availability: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	{ timestamps: true }
)

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant
