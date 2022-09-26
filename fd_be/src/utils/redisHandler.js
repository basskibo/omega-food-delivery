const { createClient } = require("redis"),
	helperMethod = require("../utils/helperMethod"),
	config = require("../config/config"),
	moment = require("moment")

const client = createClient({
	url: process.env.REDIS_URL,
})

// const subscriber = createClient({
// 	url: process.env.REDIS_URL,
// })

client.connect({ url: process.env.REDIS_URL })
// subscriber.connect({ url: process.env.REDIS_URL })
client.select(0)

// const keyExpireEvent = `__keyevent@${config.redisOrderStorage}__:expired`
// console.log(keyExpireEvent)
// subscriber.subscribe(keyExpireEvent)
// subscriber.on("message", (event) => {
// 	console.log("REDIS KEY EXPIRED!!!")
// 	console.log(event)
// })

// client.select(1)
// client.HSET("test", "data", { test: "some" })
// client.expire("test", 5)

module.exports = {
	storeSessionCredentials: async (data) => {
		try {
			const key = `omega-${data._id}-${data.hash}}`
			await client.select(0)
			await client.HSET(key, "role", data.role)
			await client.expire(key, helperMethod._generateSecondsValueMultipleByHours(3))
			return key
		} catch (e) {
			throw "There was error storing session credentials"
		}
	},
	checkSession: async (session) => {
		// console.log(`Looking for session ${session} in redis database`)
		const sessionData = await client.HGETALL(session)
		try {
			const evalSession = eval(sessionData)
			const sessionExist = Object.prototype.hasOwnProperty.call(evalSession, "role")
			return { found: sessionExist, data: sessionData, role: sessionData.role }
		} catch (exception) {
			console.log(exception)
			return false
		}
	},
	createOrderKey: async (orderId, restaurantId, endTime) => {
		try {
			const key = `order-${orderId}`
			await client.HSET(key, "endTime", endTime)
			await client.HSET(key, "restaurantId", restaurantId)
			// await client.expire(key, helperMethod._generateSecondsValueMultipleByHours(3))
			return key
		} catch (e) {
			throw "There was error storing session credentials"
		}
	},
	getOrderKeys: async () => {
		// console.log(`Looking for session ${session} in redis database`)
		try {
			const pendingOrdersKeys = await client.KEYS("order-*")
			let foundOrders = []
			if (pendingOrdersKeys.length > 0) {
				pendingOrdersKeys.forEach(async (key) => {
					console.log(key)
					const pendingOrders = await client.HGETALL(key)
					// console.log(pendingOrders.endTime)
					// const evalOrders = eval(pendingOrders)
					// const sessionExist = Object.prototype.hasOwnProperty.call(
					// 	evalOrders,
					// 	"endTime"
					// )
					if (moment(pendingOrders.endTime).isBefore(moment().format())) {
						console.log("Old key found")
						client.DEL(key)
					}
					console.log("pushing new key")
					foundOrders.push({
						restaurantId: pendingOrders.restaurantId,
						endTime: pendingOrders.endTime,
					})
					// console.log(sessionExist)
					console.log("returning")
					return foundOrders
				})
			} else {
				return false
			}
		} catch (exception) {
			console.log(exception)
			return false
		}
	},
}
