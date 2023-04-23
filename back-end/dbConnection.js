const db = require('mysql2');
require('dotenv').config();

const connection = db.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE_NAME
});

module.exports = connection;