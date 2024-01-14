// models/Job.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Job;
