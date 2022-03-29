const {Router} = require("express")

const router = Router()

const reportPDF = require("../reports/generatePDF")


router.get("/reportone", reportPDF.createInvoice)

module.exports = router