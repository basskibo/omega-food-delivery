// Define it
const redisHandler = require("../utils/redisHandler")

const fetchSessionFromRedis = async (sessionId) => {
	const session = await redisHandler.checkSession(sessionId)
	if (!session.found) {
		throw "Provided session was not found"
	}
	return session
}

module.exports.auth = async (req, res, next) => {
	try {
		const { sessionid } = req.headers
		if (!sessionid) {
			throw `Not authorized, sessionid is not available in headers!`
		}
		const session = await fetchSessionFromRedis(sessionid)

		console.log("Session is found, allowing user access")
		next()
	} catch (e) {
		res.status(403).send(e) // Express will catch this on its own.
	}
}

module.exports.authAdmin = async (req, res, next) => {
	try {
		const { sessionid } = req.headers
		if (!sessionid) {
			throw `Not authorized, sessionid is not available in headers!`
		}
		const session = await fetchSessionFromRedis(sessionid)

		if (session.role !== "admin") {
			throw `You are not authorized for this action`
		}
		next()
	} catch (e) {
		res.status(403).send(`You are not authorized for this action`)
	}
}
