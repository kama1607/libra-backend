let DataTypes = require("sequelize").DataTypes;
let _accounting = require("./accounting");
let _author = require("./author");
let _book = require("./book");
let _class_ = require("./class");
let _role = require("./role");
let _student = require("./student");
let _user = require("./user");

function initModels(sequelize) {
  let accounting = _accounting(sequelize, DataTypes);
  let author = _author(sequelize, DataTypes);
  let book = _book(sequelize, DataTypes);
  let class_ = _class_(sequelize, DataTypes);
  let role = _role(sequelize, DataTypes);
  let student = _student(sequelize, DataTypes);
  let  user = _user(sequelize, DataTypes);

  accounting.belongsTo(book, { as: "book", foreignKey: "book_id"});
  book.hasMany(accounting, { as: "accountings", foreignKey: "book_id"});
  user.belongsTo(role, { as: "role", foreignKey: "role_id"});
  role.hasMany(user, { as: "users", foreignKey: "role_id"});
  accounting.belongsTo(student, { as: "student", foreignKey: "student_id"});
  student.hasMany(accounting, { as: "accountings", foreignKey: "student_id"});

  return {
    accounting,
    author,
    book,
    class_,
    role,
    student,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
