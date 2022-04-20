const account = require("../model/accounting")
const Student = require("../model/student")
const Class = require("../model/class")
const Author = require("../model/author")
const Book = require("../model/book")

const studentInfo = require("./studentFormInfo")


const bookStatus = {
    bookGived:200,
    bookReturned: 250
}

const includeAccounts ={
    
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
}

const {Router} = require("express")

const pdf = require("html-pdf")

const router = Router()

router.get("/student-accouting/:id", async (req, res) => {
    const id = req.params.id
    await account.findAll({
        where: {student_id: id},
        ...includeAccounts
    })
    .then((student) => {
        const bookFormat = []
        for (let i = 0; i < student.length; i++) {
            if(student[i] ?.status_book === bookStatus.bookGived){
                student[i].status_book = "ВЫДАНА"
            }
            if(student[i] ?.status_book === bookStatus.bookReturned){
                student[i].status_book = "ПОЛУЧЕНО"
            }
            bookFormat.push(student[i])   
        }
        res.send(student)
    })
    .catch((err) => {
        console.log(err)
    })

})


//
router.post("/student-form/:id", async(req, res) => {
    const id = req.params.id
    const accounting = await account.findAll({
        where: {student_id: id},
        ...includeAccounts
    })
    pdf.create(studentInfo(accounting), {}).toFile(`${__dirname}/studentForm.pdf`, 
    (err) => {
        if(err){
            res.send({
                err: "report filed !!"
            })
        }
        res.send()
    }) 
})

router.get("/give-student-form", (req, res) => {
    res.sendFile(`${__dirname}/studentForm.pdf`)
})








//count books and their sum
router.get("/demo-route", async(req, res) => {
    try{
        const count = await Book.count({
            where: {status_remove: 200}
        })
        const sum = await Book.sum("price", {
            where: {status_remove: 200}
        })
        return res.status(201).json({
            count, sum
        })
    }catch(err){
        res.status(500).json({
            err: err.message
        })
    }
})


//demo update class
router.get("/ayoshin", async(req, res) => {
    const s = await Student.increment({class_id:1}, {where: {student_id:15}})
    return res.status(201).json({
        s
    })
})







module.exports = router