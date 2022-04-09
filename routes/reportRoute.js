const {Router} = require("express")

const router = Router()



const reportController = require("../controllers/reportController")

router.get("/reports", reportController.createBookReport)
module.exports = router