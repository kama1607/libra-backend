    const {Sequelize} = require("sequelize")

    const db = new Sequelize("libra_db", "admin", "admin", {
            host: "localhost",
            dialect: "mariadb",
            pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false
        }
    })

    module.exports = db
    


//const initModels = require("../models/init-models")
//initModels(db)