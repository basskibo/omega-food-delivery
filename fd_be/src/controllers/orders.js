const Order = require("../models/order"),
	jobScheduler = require("../utils/jobScheduler"),
	geoService = require("../utils/geoService"),
	Restaurant = require("../models/restaurant"),
	User = require("../models/user"),
	moment = require("moment"),
	{ findLocation, findNearestDistance } = require("../utils/geoService")

module.exports = {
	placeOrder: async (req, res) => {
		try {
			const { foodId } = req.body
			console.log(req.body)
			const restaurants = await Restaurant.find(
				{ availability: true },
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

			console.log(req.headers.sessionid)
			const userId = req.headers.sessionid.split("-")[1]
			console.log(userId)
			const userLocation = await User.findOne({ _id: userId }, { address: 1 })
			console.log(userLocation)
			const userCordinates = `${userLocation.address.latitude},${userLocation.address.longitude}`
			const nearest = await findNearestDistance(userCordinates, destinations)

			const foundNearest = restaurants[nearest.nearestIndex]

			const order = new Order({
				food: foodId,
				user: userId,
				restaurant: foundNearest._id,
				orderStartedTime: moment().format(),
				orderDeliveryTime: moment().add(1, "m").format(),
			})
			console.log(order)
			const createdOrder = await order.save()
			jobScheduler.startDeliveryProcess(
				foundNearest._id,
				createdOrder._id,
				createdOrder.orderDeliveryTime
			)

			res.status(201).json(createdOrder)
		} catch (e) {
			console.log(e)
			return res.status(400).send(e.message)
		}
	},
	getAllOrders: async (req, res) => {
		try {
			const orders = await Order.find()
				.populate({
					path: "food",
					select: ["_id", "name", "price"],
				})
				.populate({ path: "user", select: ["_id", "email", "firstName", "lastName"] })
				.populate({ path: "restaurant", select: ["_id", "name"] })
			res.status(200).send(orders)
		} catch (e) {
			return res.status(400).send(e.message)
		}
	},
}
