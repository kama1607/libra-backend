const studentBookTemplatePDF = require("./studentBookTemplatePDF")

const {Router} = require("express")

const pdf = require("html-pdf")

const router = Router()

const Book = require("../model/book")
const Author = require("../model/author")
const Student = require("../model/student")
const Class = require("../model/class")

const account = require("../model/accounting")

router.post("/account-list", async(req, res) => {
         const accounts =  await account.findAll({
              where: {status_book: 200},      
            include: [{
                model: Book,
                as: "book", 
                include: {
                    model: Author,
                    as: 'author'
                }
            },
            {
                model: Student,
                as: "student",
                include: {
                    model: Class,
                    as: "class"
                }
            }, 
        ]
    })
    pdf.create(studentBookTemplatePDF(accounts), {}).toFile(`${__dirname}/account.pdf`, (err) =>{
        if(err){
            res.send({
                error: "report don't created"
            })
        }
        res.send()
    }) 
})

router.get("/give-account", (req, res) => {
    res.sendFile(`${__dirname}/account.pdf`)
})



module.exports = router