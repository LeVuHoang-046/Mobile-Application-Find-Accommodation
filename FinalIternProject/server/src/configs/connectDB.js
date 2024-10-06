/** @format */
const { response } = require('express');
const mysql = require('mysql2')
require('dotenv').config()
// MySQL connection setup
const connection = mysql.createConnection({
  host: process.env.HOST,  
  user: process.env.USER,       
  password:  process.env.PASSWORD, 
  database:  process.env.DATABASE
});

// Connect to the database
const connectDB = async () => {
    connection.connect(err => {
      if (err) {
        console.error('Error connecting to the database:', err);
        return;
      }
      console.log('Connected to the MySQL database.');
    });
};

module.exports = {connectDB, connection};


