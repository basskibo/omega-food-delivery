const Comment = require("../models/comment"),
	Food = require("../models/food"),
	User = require("../models/user"),
	moment = require("moment")

module.exports = {
	createComment: async (req, res) => {
		try {
			const { text, foodId } = req.body
			const { sessionid } = req.headers
			const userId = sessionid.split("-")[1]
			console.log(userId)
			const foodExist = await Food.findOne({ _id: foodId })
			if (!foodExist) {
				throw { message: "Food with provided ID does not exist", status: 404 }
			}
			const comment = new Comment({
				food: foodId,
				user: userId,
				text: text,
			})
			const createComment = await comment.save()
			if (!createComment) {
				throw { message: "There was an error saving comment", status: 400 }
			}
			res.status(201).json(createComment)
		} catch (e) {
			console.log(e)
			return res.status(400).send(e.message)
		}
	},
	getCommentsForFood: async (req, res) => {
		try {
			const { foodId } = req.params
			const { limit } = req.query
			console.log(limit)
			const options = { limit: limit ? limit : 1 }
			const commentsForFood = await Comment.find(
				{ food: foodId },
				{},
				options
			).populate({ path: "user", select: ["_id", "firstName", "lastName"] })
			res.status(200).send(commentsForFood)
		} catch (e) {
			onsole.log(e)
			return res.status(400).send(e.message)
		}
	},
}
