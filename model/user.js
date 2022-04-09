const db = require("../config/dbConnect")
const {Sequelize, DataTypes} = require("sequelize")


const User = db.define("user", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            notNull: true
        } 
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true
        }
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    patronymic:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    login: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: true
        }
    },

    pass: {
        type: DataTypes.STRING(255),
        allowNull: false, 
        validate: {
            notNull: true
        }
    }
}, {
    freezeTableName: true
})


module.exports = User