const db = require("../config/dbConnect")
const {Sequelize, DataTypes} = require("sequelize")
const Student = require("../model/student")
const Book = require("../model/book")
const Author = require("../model/author")
const Class = require("../model/class")


const Accounting = db.define("accounting", {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Book,
          key: 'id'
        }
      },

      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Student,
          key: 'id'
        }
      },
      date_of_issue: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      status_book: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      return_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
    },  {
        freezeTableName: true
    })

    //Relationship between Accounting
    // and Book
    Accounting.belongsTo(Book, {
      //as:"book",
      foreignKey: "book_id"
    }) 
    Book.hasMany(Accounting, {
      //as: "accountings",
      foreignKey: "book_id"
    }) 
    

    //Between Accounting and student
    Accounting.belongsTo(Student, {
      //as: "student",
      foreignKey: "student_id"
    })

    Student.hasMany(Accounting, {
      //as: "accountings",
      foreignKey: "student_id"
    })


    

    
    

module.exports = Accounting
