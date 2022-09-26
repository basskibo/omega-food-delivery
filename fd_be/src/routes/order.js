const express = require("express")
const router = express.Router()

const { auth, authAdmin } = require("../middlewares/authorize")

const OrderController = require("../controllers/orders")

router.post("/", auth, OrderController.placeOrder)
router.get("/", authAdmin, OrderController.getAllOrders)

module.exports = router
