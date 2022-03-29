const db = require("../config/dbConnect")
const {Sequelize, DataTypes} = require("sequelize")

const Class = db.define("class", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        number:{
            type: DataTypes.INTEGER(255),
            allowNull: false,
            validate: {
                notNull: true
            }
        },
    },  {
        freezeTableName: true
    }
)

module.exports = Class