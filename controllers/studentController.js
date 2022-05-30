const models = require("../model/student")
const clss = require("../model/class")
const { QueryTypes, Sequelize } = require('sequelize');
const db = require("../config/dbConnect")


const createStudent = async(req, res) => {
    try{
        const body = req.body 
        const findStudent = await models.findOne({
            where: {FIO: req.body.FIO}
        })
        if(!findStudent){
            const response = await models.create({
                FIO: body.FIO.trim(),
                class_id: body.class_id,
                letter: body.letter.trim()
            })
            res.status(200).json(response)
        } else {
            res.status(404).send({
                status: 404,
                message: "Такой ученик уже имеется"
            })
        }
    }catch(err){
        return res.status(500).send(err.message)
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


const classUpdate = async(req, res) => {
    for(let classNumber = 10; classNumber > 0; classNumber--){
        if(classNumber !== 11) {
            await updateClasses(classNumber, classNumber + 1)
        }
    }
    const updatedStudents = await models.findAll()        
    .then((data) => {
        const result = { success: true, data: data}
        return result
    })
    .catch(error => {
        const result = {success: false, error: error}
        return result
    })
    res.send(updatedStudents)
}


async function updateClasses(fromNumber, toNumber){
    await db.query(`
    update student s join class c on c.id = s.class_id
    set class_id = (select id from class where number = ${toNumber} limit 1)
     where c.number = ${fromNumber};
    `, {
        type: QueryTypes.UPDATE
    })
}


module.exports = {
    createStudent, getStudents, updateStudent,
    deleteStudent, getStudentsByClassId,
    classUpdate
}

