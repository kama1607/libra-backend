const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounting', {
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
        model: 'book',
        key: 'id'
      }
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
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
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'accounting',
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
      {
        name: "accounting_book_id_fk",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "accounting_student_id_fk",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
    ]
  });
};
