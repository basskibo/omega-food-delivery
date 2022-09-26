const MONGOOSE_URL = "mongodb://localhost:27017/omega_test_db",
	mongoose = require("mongoose")

const foodController = require("../src/controllers/foods")

beforeAll(() => {
	// Clears the database and adds some testing data.
	// Jest will wait for this promise to resolve before running tests.
	connectToMongo().catch((err) => {
		console.log(err)
		console.log("Error while mongoose connection, exiting ..")
		process.exit(1)
	})

	async function connectToMongo() {
		await mongoose.connect(MONGOOSE_URL)
		console.log(`%s Mongoose connected to : ${MONGOOSE_URL}`, chalk.green("✔"))
	}
	return true
})

test("testing food", () => {
	const req = {},
		res = { render: jest.fn(), status: jest.fn(), send: jest.fn() }
	const rsp = foodController.getAllFood(req, res)
	console.log(rsp)
	expect(res.render.mock.calls[0][0]).toBe("test")
})
