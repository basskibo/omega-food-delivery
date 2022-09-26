// Define it
module.exports.authByToken = async (req, res, next) => {
	try {
		if (req.userRole !== "coach") {
			throw `You are not authorized for this action`
		}
		next()
	} catch (e) {
		res.status(403).send(`You are not authorized for this action`)
	}
}
