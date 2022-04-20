const models = require("../model/author")
const Op = require("sequelize").Op

        
    const createAuthor = async (req, res) => {
        try{
            const response = await models.create({
                name: req.body.name
            })
            .then((data) => {
                const res = {success: true, data:data, message:"created!!!!"}
                return res
            })
            .catch(error => {
                const res = {success: false, error: error}
            })
            res.json(response)
        }
        catch(e) {
            console.log(e)
        }
    }

    const getAuthors = async (req, res) => {
        try {
            const authors = await models.findAll()
            return res.status(200).json({
                auth: authors
            })
        }catch (err) {
            return res.status(500)
                .send(err.message)
            }
        }

    const getAuthorById = async (req, res) => {
        try{
        const id = req.params.id;
        const authorr = await models.findByPk(id)
            if(authorr){
                return res.status(200).json({
                    authorr
                })
            }
            return res.status(404).send("Нет такого автора")
        }catch (e){
            return  res.status(500).send(e.message)
        }
    }

    const updateAuhtor = async (req, res) => {
        const id = req.params.id
        const data = req.body

        await models.update(data, {
            where: {
                id: id
            }
        })
        .then((r) => {
            return res.status(200).json({
                message: "Автор изменён"
            })
        })
        .catch((e) => {
            return res.status(500).json({
                message: "Автор не найден"
            })
        })
    }

    const deleteAuthor = async (req, res) => {
            try{
               const id = req.params.id
               const authorDelete = await models.destroy({
                   where:{id: id}
               })
               if(authorDelete){
                   return res.status(204).send("Удалён автор")
               }      
            }catch(e){
                return res.status(500).send(err.message)
            }
    }
    module.exports = {
    createAuthor, getAuthors, getAuthorById,
    updateAuhtor, deleteAuthor
    }