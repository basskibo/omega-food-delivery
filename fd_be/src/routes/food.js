const express = require("express")
const router = express.Router()

const { auth, authAdmin } = require("../middlewares/authorize")

const UserController = require("../controllers/auth"),
	FoodControler = require("../controllers/foods")

router.post("/", authAdmin, FoodControler.createFood)
router.get("/", FoodControler.getAllFood)
router.get("/:foodId", FoodControler.getOne)
router.delete("/:foodId", authAdmin, FoodControler.removeFood)

module.exports = router
