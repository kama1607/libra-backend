const db = require("../config/dbConnect")
const { DataTypes } = require("sequelize")

const Author = require("./author")

const Book = db.define("book", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate:{
            notNull:true
        }
    },
    author_id: {
        type: DataTypes.INTEGER,
        references:{
            model: Author,
            key: 'id'
        },
        allowNull: false,
        validate:{
            notNull: true
        }
    },
    name_book: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    year_of_public: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: true
        }
    },
    isbn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notNull: true
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notNull: true
        }
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:true
        },   
    },
    status_remove:{
        type:DataTypes.INTEGER,
        allowNull: false, 
        validate:{
            notNull: true
        }
    },
    num_of_act:{
        type: DataTypes.INTEGER,
        
    },
    date_remove:{
        type:DataTypes.STRING,
        
    }
}, {
    freezeTableName: true
})

Book.belongsTo(Author, {
    foreignKey: 'author_id'
})

Author.hasOne(Book, {
    foreignKey: 'author_id'
})


module.exports = Book

