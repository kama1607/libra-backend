const db = require("../config/dbConnect")
const {Sequelize, DataTypes} = require("sequelize")

const Author = db.define("author", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        name:{
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notNull: true
            }
        },
    },  {
        freezeTableName: true
    }
)

module.exports = Author
