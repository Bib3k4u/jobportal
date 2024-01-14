// config.js

const mysqlConfig = {
    host: 'localhost',     // replace with your MySQL server host
    user: 'root',     // replace with your MySQL username
    password: 'root', // replace with your MySQL password
    database: 'job_portal_db',   // replace with your MySQL database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
  
  module.exports = mysqlConfig;
  