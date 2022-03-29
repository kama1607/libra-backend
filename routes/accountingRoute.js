const {Router} = require("express")

const router = Router()

const accountingController = require("../controllers/accountingController")

router.get("/accountings", accountingController.getAccs)

router.post("/accountings", accountingController.createAccount)

router.put("/accountings/:id", accountingController.updateAccount)

router.delete("/accountings/:id", accountingController.deleteAccount)

//Filter route

router.get("/givedbooks", accountingController.giveBook)
router.get("/returnedbooks", accountingController.returnBook)

module.exports = router