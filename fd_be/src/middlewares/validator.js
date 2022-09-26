const validator = require("validator")

const User = require("../models/user"),
	config = require("../config/config"),
	mongoose = require("mongoose")

const registerValidation = async (request, response, next) => {
	try {
		let { email, firstName, lastName, password, confirmPassword, role, address } =
			request.body

		function missingFieldMsg(field) {
			return `${field} field is required and can not be empty`
		}
		// TODO find better way to handle
		if (!email) throw { message: missingFieldMsg("Email") }
		if (!address) throw { message: missingFieldMsg("Address") }
		if (!firstName) throw { message: missingFieldMsg("First name") }
		if (!lastName) throw { message: missingFieldMsg("Last name") }
		if (!password) throw { message: missingFieldMsg("Password") }
		if (!confirmPassword) throw { message: missingFieldMsg("Confirm Password") }

		// 	!firstName ||
		// 	!lastName ||
		// 	!password ||
		// 	!confirmPassword ||
		// 	!role ||
		// 	!address
		// ) {
		// 	throw {
		// 		message: "All parameters are required and can not be empty",
		// 		status: 422,
		// 	}
		// }
		console.log(
			"Starting user registration !",
			email,
			firstName,
			lastName,
			password,
			role
		)
		if (!validator.isEmail(email)) {
			throw {
				message: "Please enter valid email, e.g. test@mail.com",
				status: 400,
			}
		}
		if (!validator.isLength(password, { min: 8 })) {
			throw {
				message: "Password must be at least 8 characters long",
				status: 400,
			}
		}
		if (!validator.equals(password, confirmPassword)) {
			throw {
				message: "Confirm password does not match with the password",
				status: 400,
			}
		}
		if (!validator.isIn(role, config.validation.enumRoles)) {
			throw {
				message: "Role is not valid, please select a valid role",
				status: 400,
			}
		}

		email = email.toLowerCase()

		email = validator.normalizeEmail(email, { gmail_remove_dots: false })

		const existingUser = await User.findOne({ email: email }).exec()

		if (existingUser) {
			throw { status: 400, message: `User with email ${email} already exists!` }
		}
		next()
	} catch (e) {
		const status = e.status ? e.status : 422
		const msg = e.message ? e.message : "Validation of data failed"
		response.status(status).send(msg)
	}
}

module.exports = {
	registerValidation,
}
