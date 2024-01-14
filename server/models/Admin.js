// models/Admin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration

const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other admin-related fields as needed
});

module.exports = Admin;
