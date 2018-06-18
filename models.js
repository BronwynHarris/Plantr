const sequelize = require("sequelize");
const db = new sequelize("postgres://localhost:5432/plantr");

module.exports = db;
