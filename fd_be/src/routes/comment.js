const express = require("express")
const router = express.Router()

const { auth, authAdmin } = require("../middlewares/authorize")

const CommentController = require("../controllers/comments")

router.post("/", auth, CommentController.createComment)
router.get("/:foodId", CommentController.getCommentsForFood)

module.exports = router
