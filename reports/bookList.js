const listBook = require("./listBook")

const {Router} = require("express")

const pdf = require("html-pdf")
const router = Router()


const book = require("../model/book")
const Author = require("../model/author")


//req to db and fetch data to pdf
router.post("/book-list",  async (req, res) => {
    const books = await book.findAll({
        where: {status_remove: 250},
        include: {
            model: Author,
            as: 'author'
        }
    })
    pdf.create(listBook(books), {}).toFile(`${__dirname}/removelist.pdf`, 
    (err) => {
        if(err){
            res.send({
                error: "report don't created"
            })
        }
        res.send()
    })
})

 
router.get("/give-list", (req, res) => {
    res.sendFile(`${__dirname}/removelist.pdf`)
})



module.exports = router