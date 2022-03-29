const db = require("../config/dbConnect")
const {Sequelize, DataTypes} = require("sequelize")

const Role = db.define("role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        validate:{
            notNull: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true
        }
    }

},{
    freezeTableName: true
}) 

module.exports = Role
