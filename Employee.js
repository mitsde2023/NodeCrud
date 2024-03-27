const { DataTypes } = require('sequelize');
const sequelize = require('./config');

const Emp = sequelize.define('Emp', {
  EmployeeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  EmployeeName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  EmployeeEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique:true,
  },
});

module.exports = Emp;
