const {Router} = require("express")

const router = Router()

const studentController = require("../controllers/studentController")

router.get("/students", studentController.getStudents)

router.post("/students", studentController.createStudent)

router.put("/students/:id", studentController.updateStudent)

router.delete("/students/:id", studentController.deleteStudent)

//filter Route 
router.get("/students-by-class/:id", studentController.getStudentsByClassId)

//Update class for student
router.get("/classup", studentController.classUpdate)

module.exports = router