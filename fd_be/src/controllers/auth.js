const emailHandler = require("../utils/mailHandler"),
	config = require("../config/config"),
	redisHandler = require("../utils/redisHandler"),
	helperMethod = require("../utils/helperMethod"),
	User = require("../models/user")
const validator = require("validator")
const bcrypt = require("bcrypt")
const res = require("express/lib/response"),
	{ findLocation, findNearestDistance } = require("../utils/geoService")

/**
 * User module.
 * @module {{Dynamic}} api/interface/userService
 */

module.exports = {
	/**
	 * Method for user registration.
	 * @param {object} req - Information about user which is being registered
	 * @param {object} res - Information about user which is being registered
	 * @return {object} Created user's data.
	 */
	register: async (req, res) => {
		console.log("Register controller started!")
		try {
			let { email, firstName, lastName, password, role, address } = req.body
			email = email.toLowerCase()
			email = validator.normalizeEmail(email, { gmail_remove_dots: false })

			const userExist = await User.findOne({ email: email })
			if (userExist) {
				console.log("user exist ")
				console.log(userExist)
				throw { status: 400, message: `User with email ${email} already exists` }
			}

			const location = await findLocation(address)
			const user = new User({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				role: role,
				address: location,
				isActivated: config.automaticActivation ? config.automaticActivation : false,
				activationToken: helperMethod._generateRandom(30),
			})
			const createdUser = await user.save()
			if (!createdUser) {
				throw { message: "There was error saving the user", status: 500 }
			}
			console.log(`User ${firstName} ${lastName} has been successfully created !`)
			res.status(201).send(createdUser)
		} catch (exception) {
			console.log(exception)
			const status = exception.status ? exception.status : 422
			const errMsg = exception.message
				? exception.message
				: "There was an error creating the user"
			return res.status(status).end(errMsg)
		}
		// return await userModel.create(req, res)
	},

	/**
	 * Method for login.
	 * @param {string} color - The color, in hexadecimal format.
	 * @param {number} percent - The percentage, ranging from 0 to 100.
	 * @return {string} The darkened color.
	 */
	login: async (req, res) => {
		try {
			const { email, password } = req.body
			if (!email) throw new Error("Email is required")
			if (!password) throw new Error("Password is required")

			let user = await User.findOne({ email: email })
			if (!user) {
				throw { message: "User was not found", status: 404 }
			}

			const passwordMatch = await bcrypt.compare(password, user.password)
			console.log("RESULT : ", passwordMatch)
			if (!passwordMatch) {
				throw {
					status: 404,
					message: "Wrong password",
				}
			}
			const hash = await bcrypt.genSalt(15)
			user = { ...user.toObject(), hash: hash } // mongoose results needs to be parsed to object
			const sessionKey = await redisHandler.storeSessionCredentials(user)
			user = { ...user, session: sessionKey }
			res.status(200).send(user)
		} catch (e) {
			res.status(e.status ? e.status : 400).send(e.message)
		}
	},
	findUserByEmail: async (email) => {
		return await userModel.findUserByEmail(email)
	},
	findUserById: async (id) => {
		return await userModel.findUserById(id)
	},
}
