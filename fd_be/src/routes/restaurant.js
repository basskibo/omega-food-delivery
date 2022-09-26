const express = require("express")
const router = express.Router()

const { auth, authAdmin } = require("../middlewares/authorize")

const RestaurantController = require("../controllers/restaurants")

router.post("/", auth, RestaurantController.createRestaurant)
router.get("/", RestaurantController.getAllRestaurants)
router.get("/nearest", auth, RestaurantController.findNearestRestaurant)

module.exports = router
