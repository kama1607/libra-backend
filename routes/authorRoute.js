const {Router} = require("express")

const router = Router()

const authorController = require("../controllers/authorController")

router.get("/authors",authorController.getAuthors)

router.post("/authors", authorController.createAuthor)

router.get("/authors/:id", authorController.getAuthorById)
 
router.put("/authors/:id", authorController.updateAuhtor)

router.delete("/authors/:id", authorController.deleteAuthor)


module.exports = router