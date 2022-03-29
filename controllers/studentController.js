const models = require("../model/student")

const clss = require("../model/class")

const createStudent = async (req, res) => {
    try {

        const body = req.body
        const response = await models.create({
            FIO: body.FIO,
            class_id: body.class_id,
            letter: body.letter
        })
            .then((data) => {
                const res = {
                    success: true, data: data,
                    message: "create student"
                }
                return res
            })
            .catch(error => {
                const res = { success: false, error: error }
            })
        res.json(response)
    } catch (err) {
        console.log(err)
    }
}

const getStudents = async (req, res) => {
    try {
        const students = await models.findAll({
            include: {
                model: clss,
                as: "class"
            }
        })
        return res.status(200).json({
            students
        })
    } catch (err) {
        console.log(err)
    }
}

const updateStudent = async (req, res) => {
    try {
        const id = req.body.id
        const data = req.body

        const studentUpdate = await models.update({
            FIO: data.FIO,
            class_id: data.class_id,
            letter: data.letter
        }, {
            where: { id: id }
        })
        if (!studentUpdate) {
            return res.status(200).send({
                status: 404,
                message: "Студент не найден"
            })
        }
        res.status(200).send({
            status: 200,
            message: "Студент обновлен"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Ошибка! Данные не обновлены",
            error: error,
            status: 400
        })
    }
}

const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id
        const studentDelete = await models.destroy({
            where: { id: id }
        })
        if (studentDelete) {
            return res.status(204).send("Студент удалён")
        }
        return res.status(200).send({
            status: 404,
            message: "Ошибка студент не удалён"
        })
    } catch (e) {
        return res.status(500).send(e.message)
    }
}

//1
const firstClass = async (req, res) => {
    try {
        const filterOne = await models.findAll({
            include: {
                model: clss,
                as: "class",
                where: {
                    number: 1
                }
            },
        })
        return res.status(200).json({
            filterOne
        })
    }
    catch (err) {
        console.log(err)
    }
}


const getStudentsByClassId = async (req, res) => {
    try {
        const classId = req.params.id

        const studentsByClass = await models.findAll({
            include: {
                model: clss,
                as: "class",
                where: {
                    id: classId
                }
            },
        })

        return res.status(200).json({
            students: studentsByClass
        })
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    createStudent, getStudents, updateStudent,
    deleteStudent, firstClass, getStudentsByClassId
}