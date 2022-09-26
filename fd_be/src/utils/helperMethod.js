const moment = require("moment")

module.exports = {
	_generateRandom: (length) => {
		let result = ""
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
		const charactersLength = characters.length
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength))
		}
		return result
	},
	_generateSecondsValueMultipleByHours: (hours) => hours * 60 * 60,
}
