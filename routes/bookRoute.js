const {Router} = require("express")

const router = Router()

const bookController = require("../controllers/bookController")


router.get("/books", bookController.getBooks)

router.post("/books", bookController.createBook)

router.put("/books/:id", bookController.updateBook)

router.delete("/books/:id", bookController.deleteBook)

// //filter book in stock
// router.get("/onstock", bookController.filterInStock)

//filter book in stock
router.get("/books-by-status/:status", bookController.filterByStatus)

// //filterBook on stageTemove
// router.get("/onstageremove", bookController.filterOnStageRemove)

// //filter deleted book
// router.get("/filterdeleted", bookController.filterRemoved)
module.exports = router