const express = require("express")
const chalk = require("chalk")
// const coachRouter = require("./src/routes/coach")

const foodRouter = require("./src/routes/food")
const authRouter = require("./src/routes/auth")
const restaurantRouter = require("./src/routes/restaurant")
const orderRouter = require("./src/routes/order")
const commentRouter = require("./src/routes/comment")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const UserController = require("./src/controllers/auth")
const session = require("cookie-session")

const corsOptions = {
	origin: ["http://localhost:3000", "http://localhost:3001"],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// parse application/x-www-form-urlencoded and extending it in order to post nested obj
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.options("*", cors()) // include before other routes
app.use(cors(corsOptions))

app.use("/api/auth", authRouter)
app.use("/api/food", foodRouter)
app.use("/api/restaurant", restaurantRouter)
app.use("/api/order", orderRouter)
app.use("/api/comment", commentRouter)

app.set("trust proxy", 1) // trust first proxy
const oneDay = 1000 * 60 * 60 * 24
app.use(
	session({
		secret: "thisisjustsomesecretforabel",
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: oneDay },
	})
)

// erro mailHandler
app.use(function (err, req, res, next) {
	console.error(err)
	res.status(err.statusCode || 500).send(err.msg || "Something went wrong and  broke!")
})
module.exports = app
