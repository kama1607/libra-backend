const db = require("../config/dbConnect")
const {Sequelize, DataTypes} = require("sequelize")

const Class = require("../model/class")
const Student = db.define("student", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,

        validate:{
            notNull: true
        }
    },
    FIO:{
        type:DataTypes.STRING(255),
        allowNull: false,
        validate:{
            notNull: true
        }
    },
    
    class_id:{
        type: DataTypes.INTEGER,
        references:{
            model: Class,
            key: 'id'
        },
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    letter: {
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            notNull: true
        }
    }

}, {
    freezeTableName: true
})

Student.belongsTo(Class, {
    //as: "class",
    foreignKey: 'class_id'
})

Class.hasOne(Student, {
    //as: "students",
    foreignKey: "class_id"
})


module.exports = Student