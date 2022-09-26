module.exports = {
	automaticActivation: true,
	redisKeyStorage: 0,
	redisOrderStorage: 1,
	validation: {
		enumRoles: ["user", "admin"],
		enumStatuses: [
			"Pending",
			"Approved",
			"Declined",
			"Postponed",
			"Waiting for payment",
		],
		enumRestaurantStatuses: ["Delivery In progress", "Available"],
		email: {
			min: 5,
			max: 35,
		},
		password: {
			min: 6,
			max: 30,
		},
		activationTokenLength: 30,
	},
}
