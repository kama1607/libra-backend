const models = require("../model/book")
const author = require("../model/author")


const stRemove = {
    bookInStock: 200,
    onStageRemove: 250,
    removeBook: 300
}

const includeBook = {
    include: {
        model: author,
        as: "author"
    },
}

const createBook = async (req, res) => {
    try {
        const response = await models.create({
            author_id: req.body.author_id,
            name_book: req.body.name_book,
            year_of_public: req.body.year_of_public,
            isbn: req.body.isbn,
            price: req.body.price,
            category: req.body.category,
            status_remove: req.body.status_remove,
            //num_of_act: req.body.num_of_act,
            //date_remove: req.body.date_remove
        })
            .then((data) => {
                const res = { success: true, data: data, message: "created!!!!" }
                return res
            })
            .catch(error => {
                const res = { success: false, error: error }
            })

        res.json(response)
    }
    catch (e) {
        console.log(e)
    }
}

const getBooks = async (req, res) => {
    await models.findAll({
        ...includeBook
    })
        .then((book) => {
            const bookFormat = []
            for (let i = 0; i < book.length; i++) {
                if (book[i]?.status_remove === stRemove.bookInStock) {
                    book[i].status_remove = "В НАЛИЧИИ"
                }
                if (book[i]?.status_remove === stRemove.onStageRemove) {
                    book[i].status_remove = "НА СПИСАНИЕ"
                }
                if (book[i]?.status_remove === stRemove.removeBook) {
                    book[i].status_remove = "СПИСАН"
                }
                bookFormat.push(book[i])
            }
            res.send(book)
        })
        .catch((err) => {
            console.log(err)
        })
}


const updateBook = async (req, res) => {
    try {
        const id = req.params.id
        const [updated] = await models.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedBook = await models.findOne({
                where: {
                    id: id
                }
            })
            return res.status(200).json({
                book: updatedBook
            })
        }
        throw new Error("Book is not found")
    } catch (err) {
        console.log(err)
    }
}


const deleteBook = async (req, res) => {
    try {
        const id = req.params.id
        const bookDelete = await models.destroy({
            where: { id: id }
        })
        if (bookDelete) {
            res.status(204).send("Книга удалена")
        }
    }
    catch (e) {
        return res.status(500).send(e.message)
    }
}

const getBookById = async (req, res) => {
    try{
        const id = req.params.id
        const Book = await models.findOne({
            where: {id: id}
        })
        if(Book){
            return res.status(200).json({
                Book
            })
        }
        return res.status(404).send(
            "Не найдена книга"
        )

    }catch(err){
        return res.status(500).send(err.message)
    }


}

const filterByStatus = async (req, res) => {
    const statusNumber = req.params.status

    await models.findAll({
        where: { status_remove: statusNumber },
        ...includeBook,
    }).then(books => {
        for (let i = 0; i < books.length; i++) {
            if (books[i]?.status_remove === stRemove.bookInStock) {
                books[i].status_remove = "В НАЛИЧИИ"
            }
            if (books[i]?.status_remove === stRemove.onStageRemove) {
                books[i].status_remove = "НА СПИСАНИЕ"
            }
            if (books[i]?.status_remove === stRemove.removeBook) {
                books[i].status_remove = "СПИСАН"
            }
        }

        res.send(books)
    }).catch((err) => {
        console.log(err)
    })
}


module.exports = {
    getBooks, createBook, updateBook,filterByStatus, deleteBook,
    getBookById
}