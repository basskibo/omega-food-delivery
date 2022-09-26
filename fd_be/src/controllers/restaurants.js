const Restaurant = require("../models/restaurant"),
	{ findLocation, findNearestDistance } = require("../utils/geoService"),
	User = require("../models/user"),
	jobScheduler = require("../utils/jobScheduler")

module.exports = {
	createRestaurant: async (req, res) => {
		try {
			const { name, address } = req.body
			console.log(req.body)
			console.log(name)
			if (!name) throw new Error("Food name is required")
			if (!address) throw new Error("Address field is required")
			const location = await findLocation(address)

			const food = new Restaurant({ name, address, geolocation: location })
			const createdFood = await food.save()
			res.status(201).json(createdFood)
		} catch (e) {
			console.log(e)
			return res.status(400).send(e.message)
		}
	},

	getAllRestaurants: async (req, res) => {
		try {
			const restaurants = await Restaurant.find(
				{},
				{
					name: 1,
					availability: 1,
					"geolocation.formattedAddress": 1,
					"geolocation.latitude": 1,
					"geolocation.longitude": 1,
				},
				{}
			)

			res.json(restaurants)
		} catch (e) {
			return res.status(404).send(e.message)
		}
	},
	findNearestRestaurant: async (req, res) => {
		try {
			const restaurants = await Restaurant.find(
				{},
				{
					name: 1,
					availability: 1,
					"geolocation.formattedAddress": 1,
					"geolocation.latitude": 1,
					"geolocation.longitude": 1,
				},
				{}
			)
			let destinations = ""
			restaurants.forEach((restaurant, index) => {
				destinations += `${restaurant.geolocation.latitude},${
					restaurant.geolocation.longitude
				}${index + 1 != restaurants.length ? "|" : ""}`
			})

			const userId = req.headers.sessionid.split("-")[1]
			const userLocation = await User.findOne({ _id: userId }, { address: 1 })
			const userCordinates = `${userLocation.address.latitude},${userLocation.address.longitude}`
			const nearest = await findNearestDistance(userCordinates, destinations)

			const foundNearest = restaurants[nearest.nearestIndex]

			res.json(foundNearest)
		} catch (e) {
			return res.status(404).send(e.message)
		}
	},
}
