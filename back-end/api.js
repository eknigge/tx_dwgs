const express = require('express');
const app = express();
const port = 3000;
const connection = require('./dbConnection');
app.use(express.json());
const queries = require('./sqlQueries');

// import queries
let poleQuery = queries.poleQuery;
let dwgQuery = queries.dwgQuery;
let lineQuery = queries.lineQuery;
let apiKeyQuery = queries.apiKeyQuery;

// regular expressions for query
const rePole = /\d\/\d+/;
const reLine = /\d{3}/;
const reDwg = /[tT].*/;

// delete query variables
let deleteQuery = undefined
const deleteQueries = {
	"\\d\/\\d+": queries.deletePole,
	"\\d{3}": queries.deleteLine,
	"[tT].*": queries.deleteDwg
}

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

// "/" get endpoint, used for testing only
app.get('/', (req, res) => {
	connection.query(
		'SELECT * FROM line',
		function (err, results, fields) {
			res.send(results);
			console.log('results returned');
		}
	);
})

// "/" post endpoint
app.post('/', (req, res) => {
	sqlQuery = determineQuery(req.body.query);
	console.log(sqlQuery);
	connection.query(sqlQuery,
		function (err, results, fields) {
			res.send(results);
		})
})

// "/admin" post endpoint
app.post('/admin', (req, res) => {

	let userQuery = undefined;
	let deleteQuery = undefined;

	// validate api key
	userKey = req.body.api_key;
	query = apiKeyQuery(userKey);
	connection.query(query,
		function (err, results, fields) {
			// check api key
			if (results.length == 0) {
				res.status(400).send('Bad API Key');
				console.log('bad API key, no update action')
			// if key valid then run query
			} else {
				connection.query(deleteQuery,
					function (err, results, fields) {
						console.log(`delete: ${userQuery}`)
						res.send('success');
					})
			}
		})

	// determine delete query
	userQuery = req.body.query;
	for (const key in deleteQueries) {
		let regex = new RegExp(key);
		if (regex.test(userQuery)) {
			deleteQuery = deleteQueries[key](userQuery);
		}
	}

	// update logging table
	let logQueryText = deleteQuery.replace(/"/g, '\'');
	logQueryText = logQueryText.replace(/;/g, '');
	logQueryText = logQueryText.replace(/\n/g, '');

	let logQuery = queries.addLogEvent(logQueryText);
	connection.query(logQuery,
		function (err, results, fields) {
			console.log('event logged');
		})

	// update user_logging table
	let loggingUpdateQuery = queries.updateUserLogging(userKey);
	connection.query(loggingUpdateQuery,
		function (err, results, fields) {
			console.log('updated user_logging table')
		})

})

app.listen(port, () => {
	console.log(`App started on port: ${port}`)
})

