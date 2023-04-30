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

// regular expressions for query
const rePole = /\d\/\d+/;
const reLine = /\d{3}/;
const reDwg = /[tT].*/;

function determineQuery(input) {
	if (rePole.test(input)) {
		return poleQuery(input)
	} else if (reDwg.test(input)) {
		return dwgQuery(input)
	} else if (reLine.test(input)) {
		return lineQuery(input)
	} else {
		return poleQuery(input)
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

