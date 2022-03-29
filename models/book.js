const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name_book: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    year_of_public: {
      type: DataTypes.DATE(4),
      allowNull: false
    },
    isbn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status_remove: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    num_of_act: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date_remove: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'book',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
