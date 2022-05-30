//import report page 
const studentBookTemplatePDF = require("./studentBookTemplatePDF")


const {Router} = require("express")
const pdf = require("html-pdf")
const router = Router()

const Account = require("../model/accounting")
const Book = require("../model/book")
const Author = require("../model/author")
const Student = require("../model/student")
const Class = require("../model/class")

router.post("/accounting-by-class/:class", async(req, res) => {
        const classID = req.params.class
        const acccountsByClass = await Account.findAll({
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
            where: {class_id: classID},
            include: {
                model: Class,
                as: "class",  
            },
            
        }, 
    ]
    })
    
    pdf.create(studentBookTemplatePDF(acccountsByClass), {}).toFile(`${__dirname}/account.pdf`, (err) =>{
        if(err){
            res.send({
                error: "report don't created"
            })
        }
        res.send()
    }) 
})

router.get("/give-accounts", (req, res) => {
    res.sendFile(`${__dirname}/account.pdf`)
})






module.exports = router
