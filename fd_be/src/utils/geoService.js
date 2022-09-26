const NodeGeocoder = require("node-geocoder")
const options = {
	provider: "google",
	apiKey: process.env.GOOGLE_API_KEY,
	formatter: null,
}
let axios = require("axios")

// const repsonse = {
// 	destination_addresses: [
// 		"Mileve Marić 33, Novi Sad, Serbia",
// 		"Bate Brkića 6, Novi Sad 21000, Serbia",
// 		"Kotorska 20, Novi Sad 21000, Serbia",
// 		"Banatska 4, Novi Sad, Serbia",
// 	],
// 	origin_addresses: ["Kotorska 32, Novi Sad, Serbia"],
// 	rows: [
// 		{
// 			elements: [
// 				{
// 					distance: {
// 						text: "3.7 km",
// 						value: 3740,
// 					},
// 					duration: {
// 						text: "7 mins",
// 						value: 447,
// 					},
// 					status: "OK",
// 				},
// 				{
// 					distance: {
// 						text: "3.0 km",
// 						value: 2952,
// 					},
// 					duration: {
// 						text: "7 mins",
// 						value: 408,
// 					},
// 					status: "OK",
// 				},
// 				{
// 					distance: {
// 						text: "0.1 km",
// 						value: 126,
// 					},
// 					duration: {
// 						text: "1 min",
// 						value: 14,
// 					},
// 					status: "OK",
// 				},
// 				{
// 					distance: {
// 						text: "4.4 km",
// 						value: 4407,
// 					},
// 					duration: {
// 						text: "11 mins",
// 						value: 687,
// 					},
// 					status: "OK",
// 				},
// 			],
// 		},
// 	],
// 	status: "OK",
// }

const findLocation = async (address) => {
	const geocoder = NodeGeocoder(options)
	const langLat = await geocoder.geocode({
		address: `${address} Novi Sad`,
		country: "rs",
		countryCode: "RS",
		city: "Novi Sad",
	})
	const location = langLat[0]
	const { longitude, latitude, formattedAddress } = location

	const cordinates = { latitude, longitude, formattedAddress }
	return cordinates
}

const findNearestDistance = async (origins, destinations) => {
	try {
		let url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
			origins
		)}&destinations=${encodeURIComponent(destinations)}&key=${
			process.env.GOOGLE_API_KEY
		}`
		// url = encodeURIComponent(url)

		var config = {
			method: "get",
			url: url,
			headers: {},
		}

		const response = await axios(config)
		if (!response.data) {
			throw {
				message: "There was error fetching results from google API",
				status: 400,
			}
		}
		if (response.data.rows.length == 0) {
			throw { message: "There is no available restaurant right now", status: 404 }
		}
		const destinationDistances = response.data.rows[0].elements
		let nearestValue,
			nearestIndex = 0
		destinationDistances.forEach((destination, index) => {
			const destinationDistance = destination.distance.value
			if (index == 0) {
				nearestValue = destinationDistance
				nearestIndex = index
				console.log("setting first distance aws nearest")
			}
			console.log(destinationDistance + " ==" + nearestValue)
			if (destinationDistance < nearestValue) {
				console.log("Found new nearest distance ", destinationDistance)
				nearest = destinationDistance
				nearestIndex = index
			}
		})
		console.log("________________________")
		console.log({ nearestValue, nearestIndex })
		return { nearestValue, nearestIndex }
	} catch (e) {
		console.log(e)
		throw { message: e.message, status: 500 }
	}
}

module.exports = {
	findLocation,
	findNearestDistance,
}
