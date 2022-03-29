const db = require("../config/dbConnect")
const {Sequelize, DataTypes} = require("sequelize")
const Role = requiere("../model/role.js")


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
    role_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'role',
            key: 'id'
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

 User.belongsTo(Role, {
    as: "role",
    foreignKey: "role_id"
 })

 Role.hasMany(User, {
    as: "users",
    foreignKey: "role_id"
 })


module.exports = User