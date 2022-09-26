const Food = require("../models/food")

module.exports = {
	createFood: async (req, res) => {
		try {
			const { name, picture, price, description } = req.body

			console.log(req.body)
			if (!name) throw new Error("Food name is required")
			if (!price) throw new Error("Food price is required")
			if (!picture) throw new Error("Food picutre is required")
			const food = new Food({ name, price, picture, description })
			const createdFood = await food.save()
			res.status(201).json(createdFood)

			//Find out author object
			// const user = await User.findByPk(req.user.email)
			// if (!user) throw new Error("User does not exist")
			// const slug = slugify(data.title)
			// let article = await Article.create({
			// 	slug: slug,
			// 	title: data.title,
			// 	description: data.description,
			// 	body: data.body,
			// 	UserEmail: user.email,
			// })

			// if (data.tagList) {
			// 	for (let t of data.tagList) {
			// 		let tagExists = await Tag.findByPk(t)
			// 		let newTag
			// 		if (!tagExists) {
			// 			newTag = await Tag.create({ name: t })
			// 			article.addTag(newTag)
			// 		} else {
			// 			article.addTag(tagExists)
			// 		}
			// 	}
			// }

			// article = await Article.findByPk(slug, { include: Tag })
			// article = sanitizeOutput(article, user)
			// res.status(201).json({ article })
		} catch (e) {
			console.log(e)
		}
	},

	getAllFood: async (req, res) => {
		try {
			const { limit, sort } = req.query
			let sortBy = sort === "ASC" ? { rating: 1 } : { rating: -1 }

			const query = {
				limit: limit ? limit : "",
				sort: sortBy,
			}
			const foods = await Food.find({}, {}, query)
			const foodCount = foods.length //await Food.count({})

			res.json({ foodList: foods, count: foodCount })
		} catch (e) {
			return res.status(404).send(e.message)
		}
	},

	removeFood: async (req, res) => {
		try {
			const { foodId } = req.params
			if (!foodId) throw { message: "Food ID must be provided" }
			console.log("Removing food: " + foodId)
			const removedFood = await Food.deleteOne({ _id: foodId })
			if (removedFood.deletedCount !== 1) {
				throw { message: "Food with provided ID does not exist", status: 404 }
			}
			console.log(removedFood)
			res.send(`Food with _id : ${foodId} successfully deleted`)
		} catch (e) {
			const status = e.status ? e.status : 400
			return res.status(status).send(e.message)
		}
	},
	getOne: async (req, res) => {
		try {
			const { foodId } = req.params
			if (!foodId) throw { message: "Food ID must be provided", status: 404 }
			const foundFood = await Food.findOne({ _id: foodId })
			if (!foundFood) {
				throw { message: "Food with provided ID does not exist", status: 404 }
			}
			res.status(200).json(foundFood)
		} catch (e) {
			const status = e.status ? e.status : 400
			return res.status(status).send(e.message)
		}
	},
}
