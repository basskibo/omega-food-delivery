const schedule = require("node-schedule"),
	moment = require("moment"),
	Restaurant = require("../models/restaurant"),
	Order = require("../models/order"),
	RedisHandler = require("./redisHandler")

// const lookForPendingDeliveries = async () => {
// 	const pendingOrders = await RedisHandler.getOrderKeys()
// 	console.log("pendingOrders")
// 	console.log(pendingOrders)
// }
// lookForPendingDeliveries()

module.exports = {
	startDeliveryProcess: async (restaurantId, orderId, endTime) => {
		const updatedRestaurant = await Restaurant.updateOne(
			{ _id: restaurantId },
			{ $set: { availability: false } }
		)
		await RedisHandler.createOrderKey(orderId, restaurantId, endTime)
		schedule.scheduleJob(endTime, async function () {
			console.log(
				"Delivery process completed, restaurant is available for next delivery."
			)
			await Restaurant.updateOne(
				{ _id: restaurantId },
				{ $set: { availability: true } }
			)
			await Order.updateOne({ _id: orderId }, { $set: { delivered: true } })
		})
	},
}
