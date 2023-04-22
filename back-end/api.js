const express = require('express');
const app = express();
const port = 3000;
const connection = require('./dbConnection');
app.use(express.json());
const queries = require('./sqlQueries');

// default query parameters
let poleQuery = queries.poleQuery;
let dwgQuery = queries.dwgQuery;
let lineQuery = queries.lineQuery;
let poleStencilDefault = "EA-O 3/3";
let lineNumberDefault = "120";
let dwgNameDefault = "T120-6";

// regular expressions for query
const rePole = /.*\d\/\d+/;
const reLine = /\d{3}/;
const reDwg = /[tT].*/;

function determineQuery(input) {
	if (rePole.test(input)) {
		poleStencilDefault = input
		return poleQuery
	} else if (reDwg.test(input)) {
		dwgNameDefault = input
		return dwgQuery
	} else if (reLine.test(input)) {
		lineNumberDefault = input
		return lineQuery
	} else {
		poleStencilDefault = input
		return poleQuery
	}
}

app.get('/', (req, res) => {
	connection.query(
		'SELECT * FROM line',
		function (err, results, fields) {
			res.send(results);
			console.log('results returned');
		}
	);
})

app.post('/', (req, res) => {
	sqlQuery = determineQuery(req.body.query);
	console.log(sqlQuery);
	connection.query(sqlQuery,
		function (err, results, fields) {
			res.send(results);
		})
})

app.listen(port, () => {
	console.log(`App started on port: ${port}`)
})

