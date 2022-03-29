const express = require("express")

const router = express.Router()

const classController = require("../controllers/classController.js")

router.get("/classes", classController.getClasses)

module.exports = router





