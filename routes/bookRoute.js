const {Router} = require("express")

const router = Router()

const bookController = require("../controllers/bookController")


router.get("/books", bookController.getBooks)

router.post("/books", bookController.createBook)

router.put("/books/:id", bookController.updateBook)

router.delete("/books/:id", bookController.deleteBook)


//filter books in
router.get("/books-by-status/:status", bookController.filterByStatus)


module.exports = router