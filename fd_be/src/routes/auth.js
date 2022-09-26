const express = require("express"),
	router = express.Router(),
	UserController = require("../controllers/auth")

const config = require("../config/config")
const { registerValidation } = require("../middlewares/validator")

const crypto = require("crypto")
var parser = require("body-parser")
const User = require("../models/user")
var urlencodedParser = parser.urlencoded({ extended: false })

/** API for registration of user */
router.post("/", registerValidation, UserController.register)

/** API for user authentication  */
router.post(
	"/login",
	UserController.login
	// [
	// 	check("email").notEmpty().isEmail(),
	// 	check("password")
	// 		.exists()
	// 		.custom(async (value) => {
	// 			if (value.length < config.validation.password.min) {
	// 				throw `Minimum characters length is ${config.validation.password.min} `
	// 			}
	// 		}),
	// ],
	// async (req, res) => {
	// 	try {
	// 		validationResult(req).throw()
	// 		console.log("VEC POSTOJI??")

	// 		const user = await UserController.login(req.body)
	// 		this._express = {
	// 			session: user.session,
	// 			user: user,
	// 			userId: user._id,
	// 		}
	// 		res.send(user)
	// 	} catch (exc) {
	// 		console.log(exc)
	// 		res.writeHead(exc.statusCode || 500)
	// 		res.end(
	// 			exc.msg ||
	// 				`${exc.errors[0].msg} for ${exc.errors[0].param}` ||
	// 				"There was some internal error trying to register the user"
	// 		)
	// 	}
	// }
)

module.exports = router
