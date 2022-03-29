const models = require("../model/accounting")

const bookStatus = {
    bookGived:200,
    bookReturned: 250
}

const Student = require("../model/student")
const Book = require("../model/book")
const Class = require("../model/class")
const Author = require("../model/author")  

    const createAccount = async( req, res) =>{
        try{
            const response = await models.create({
                book_id: req.body.book_id,
                student_id: req.body.student_id,
                date_of_issue: req.body.date_of_issue,
                status_book: req.body.status_book,
                return_date: req.body.return_date,
                notes: req.body.notes
            })
            .then((data) => {
                const res = {success: true, data: data,
                message: "created Account !!!!!"}
                return res
            })
            .catch(error => {
                const res = {success: false, error:error}
            })
            res.json(response)
        }
        catch(err){
            console.log(err)
        }
    }


    // const getAccs = async(req, res) => {
    //     try {
    //         const accs = await models.findAll({
    //             include: [{
    //                 model: Book,
    //                 as: "book"
    //             }, 
    //             {
    //                model: Student,
    //                as: "student" 
    //             }
    //         ]
    //         })
    //         return res.status(200).json({
    //             accs
    //         })
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

    const getAccs = async (req, res) => {
        await models.findAll({
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
        .then((accs) => {
            const accountFormat = []
            for(let i = 0; i< accs.length; i++) {
                if(accs[i] ?.status_book === bookStatus.bookGived){
                    accs[i].status_book = "ВЫДАНА"
                }
                if(accs[i] ?.status_book === bookStatus.bookReturned){
                    accs[i].status_book = "ПОЛУЧЕНО"
                }
                accountFormat.push(accs[i])    
            }
            res.send(accs)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const updateAccount = async (req, res) => {
        try{
            const id = req.body.id
            const data = req.body 
            
            const updateAccoun = await models.update({
               book_id: data.book_id,
               student_id: data.student_id,
               date_of_issue: data.date_of_issue,
               status_book: data.status_book,
               return_date: data.return_date,
               notes: data.notes     
            }, {
                where: {id: id}
            })
            if(!updateAccoun) {
                return res.status(200).send({
                    status: 404,
                    message: "Не найден учет"
                })
            }
            res.status(200).send({
                status: 200,
                message: "Учёт обновлен"
            })
        }catch(error) {
            console.log(error)
            return res.status(400).send({
                message: "Не обновлены данные",
                error:error,
                status: 400
            })
        }
    }


    const deleteAccount = async (req, res) => {
        try{
            const id = req.params.id
            const accountDelete = await models.destroy({
                where: {id: id}
            })
            if(accountDelete){
                return res.status(204).send("Запись удалена")
            }
            return res.status(200).send({
                status: 404,
                message: "Запись не удалена"})
        }catch(e){
            return res.status(500).send(e.message)    
        }
    }

    const giveBook = async(req, res) => {
    
            await models.findAll({
                where: { status_book: 200}
            })
            .then((accs) => {
                const accountFormat = []
                for(let i = 0; i< accs.length; i++) {
                    if(accs[i] ?.status_book === bookStatus.bookGived){
                        accs[i].status_book = "ВЫДАНА"
                    }
                    accountFormat.push(accs[i])    
                }
                res.send(accs)
            })
            .catch((err) => {
            console.log(err)
        }) 
    }

    const returnBook = async(req, res) => {
        await models.findAll({
            where: { status_book: 250}
        })
        .then((accs) => {
            const accountFormat = []
            for(let i = 0; i< accs.length; i++) {
                if(accs[i] ?.status_book === bookStatus.bookReturned){
                    accs[i].status_book = "ПОЛУЧЕНО"
                }
                accountFormat.push(accs[i])    
            }
            res.send(accs)
        })
            .catch((err) => {
            console.log(err)
        }) 

    }

    module.exports = {
        createAccount, getAccs, updateAccount,
        deleteAccount, giveBook, returnBook
    }
