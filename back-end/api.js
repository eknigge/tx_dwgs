const express = require('express');
const app = express();
const port = 3000;
const connection = require('./dbConnection');
app.use(express.json());
const queries = require('./sqlQueries');

const cors = require('cors')
app.use(cors())

// import queries
let poleQuery = queries.poleQuery;
let dwgQuery = queries.dwgQuery;
let lineQuery = queries.lineQuery;
let apiKeyQuery = queries.apiKeyQuery;
let databaseTables = ["pole", "drawings", "line", "pole_drawings"]
let allowedUniqueIdentifiers = {
	'pole': ['pole_id'],
	'pole_drawings': ['pole_drawings_id'],
	'line': ['line_id', 'line_number_existing'],
	'drawings': ['drawing_id', 'drawing_name_existing']
}

let updateQueries = {
	'pole_id': queries.updatePoleId,
	'drawing_name': queries.updateDrawings
}

// regular expressions for query
const rePole = /\d\/\d+/;
const reLine = /\d{3}/;
const reDwg = /[tT].*/;

// delete query variables
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
	let userKey = req.body.api_key;

	// validate api key
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
	// async operation
	userQuery = req.body.query;
	for (const key in deleteQueries) {
		let regex = new RegExp(key);
		if (regex.test(userQuery)) {
			deleteQuery = deleteQueries[key](userQuery);
		}
	}

	console.log(deleteQuery);

	// log event
	updateLoggingTable(deleteQuery, userKey)

})

// "/tables" endpoint
app.post('/tables', (req, res) => {
	// validate input
	if (checkTableInput(req.body.table, databaseTables) === false) {
		res.status(400).send('bad table entered');
		console.log('user entered invalid table')
	}

	// get query
	let tableQuery = determineTableQuery(req.body.table)

	// execute query
	connection.query(tableQuery,
		function (err, results, fields) {
			res.send(results);
			console.log('sent table query results');
		})

})

app.listen(port, () => {
	console.log(`App started on port: ${port}`)
})

function checkTableInput(queryString, tableList) {
	for (let i = 0; i < tableList.length; i++) {
		if (queryString.toLowerCase() === tableList[i].toLowerCase()) {
			return true;
		}
	}
	return false;
}

function determineTableQuery(queryString) {
	if (queryString === "pole") {
		return queries.getPoleTable();
	} else if (queryString === "drawings") {
		return queries.getDrawingsTable();
	} else if (queryString === "line") {
		return queries.getLineTable();
	} else if (queryString === "pole_drawings") {
		return queries.getPoleDrawingsTable();
	}
}

// UPDATE endpoint pole
app.post('/update_pole', (req, res) => {
	let apiKey = req.body.api_key;
	let tableName = req.body.table_name;
	let tableValues = req.body.table_value;
	let uniqueIdentifierFound = validateIdentifier(
		tableValues,
		tableName,
		allowedUniqueIdentifiers);
	let uniqueIdentifier = getUniqueIdentifier(tableValues, allowedUniqueIdentifiers);

	// validate unique identifier 
	if (!(uniqueIdentifierFound)) {
		res.status(400).send('No unique identifier provided');
		console.log('No unique identifier provided');
		return;
	}

	// validate table field
	if (!(checkTableInput(tableName, databaseTables))) {
		res.status(400).send('bad table entered');
		console.log('bad table entered');
		return;
	}

	// validate API key and execute query
	apiQuery = apiKeyQuery(req.body.api_key);
	connection.query(apiQuery,
		function (err, results, fields) {
			// validate API key
			if (results.length == 0) {
				res.status(400).send('Bad API Key');
				console.log('bad API Key');
				return;
				// run query
			} else if (tableName === 'pole') {
				let pole_stencil = req.body.table_value.pole_stencil
				updateQuery = updateQueries[uniqueIdentifier];
				updateQuery = updateQuery(tableValues[uniqueIdentifier], pole_stencil);
				console.log(updateQuery)
				connection.query(updateQuery,
					function (err, results, fields) {
						res.send('pole table updated');
						console.log('pole table updated');
					})
				// log action
				updateLoggingTable(updateQuery, apiKey);
			}
		})
})

function validateIdentifier(valueObj, tableName, allowedIdentifiers) {
	uniqueId = allowedIdentifiers[tableName]
	for (let key in valueObj) {
		for (let i = 0; i < uniqueId.length; i++) {
			if (uniqueId[i] === key) {
				return true;
			}
		}
	}
	return false;
}

function getUniqueIdentifier(valueObj, identifiers) {
	for (let key in valueObj) {
		for (let key2 in identifiers) {
			if (identifiers[key2].includes(key)) {
				return key;
			}
		}
	}
	return 'No Unique Identifier';
}

const updateLoggingTable = (logQueryText, userKey) => {
	// remove special characters
	logQueryText = logQueryText.replace(/"/g, '\'');
	logQueryText = logQueryText.replace(/;/g, '');
	logQueryText = logQueryText.replace(/\n/g, '');

	// update logging table
	let logQuery = queries.addLogEvent(logQueryText);
	connection.query(logQuery,
		function (err, eresults, fields) {
			console.log('updated logging table');
		})

	// update user_logging table
	let userLoggingQuery = queries.updateUserLogging(userKey);
	connection.query(userLoggingQuery,
		function (err, results, fields) {
			console.log('updated user_logging table');
		})
}

// UPDATE endpoint drawings
app.post('/update_drawing', (req, res) => {
	let apiKey = req.body.api_key;
	let tableName = req.body.table_name;
	let tableValues = req.body.table_value;
	let uniqueIdentifierFound = validateIdentifier(
		tableValues,
		tableName,
		allowedUniqueIdentifiers);

	// validate unique identifier 
	if (!(uniqueIdentifierFound)) {
		res.status(400).send('No unique identifier provided');
		console.log('No unique identifier provided');
		return;
	}

	// validate table field
	if (!(checkTableInput(tableName, databaseTables))) {
		res.status(400).send('bad table entered');
		console.log('bad table entered');
		return;
	}

	// validate API key and execute query
	apiQuery = apiKeyQuery(req.body.api_key);
	connection.query(apiQuery,
		function (err, results, fields) {
			// validate API key
			if (results.length == 0) {
				res.status(400).send('Bad API Key');
				console.log('bad API Key');
				return;
				// run query
			} else if (tableName === 'drawings') {
				updateQuery = queries.updateDrawings;
				updateQuery = updateQuery(
					tableValues.drawing_name_existing,
					tableValues.drawing_name_new,
					tableValues.drawing_title,
					tableValues.revision_number,
					tableValues.revision_date);
				connection.query(updateQuery,
					function (err, results, fields) {
						res.send('drawing table updated');
						console.log('drawing table updated');
					})
				// log action
				updateLoggingTable(updateQuery, apiKey);
			}
		})
})



// UPDATE line table
app.post('/update_line', (req, res) => {
	let apiKey = req.body.api_key;
	let tableName = req.body.table_name;
	let tableValues = req.body.table_value;
	let uniqueIdentifierFound = validateIdentifier(
		tableValues,
		tableName,
		allowedUniqueIdentifiers);

	// validate unique identifier 
	if (!(uniqueIdentifierFound)) {
		res.status(400).send('No unique identifier provided');
		console.log('No unique identifier provided');
		return;
	}

	// validate table field
	if (!(checkTableInput(tableName, databaseTables))) {
		res.status(400).send('bad table entered');
		console.log('bad table entered');
		return;
	}

	// validate API key and execute query
	apiQuery = apiKeyQuery(req.body.api_key);
	connection.query(apiQuery,
		function (err, results, fields) {
			// validate API key
			if (results.length == 0) {
				res.status(400).send('Bad API Key');
				console.log('bad API Key');
				return;
				// run query
			} else if (tableName === 'line') {
				updateQuery = queries.updateLineTable;
				updateQuery = updateQuery(
					tableValues.line_number_existing,
					tableValues.line_number_new,
					tableValues.line_name,
					tableValues.line_abbreviation);
				connection.query(updateQuery,
					function (err, results, fields) {
						res.send('drawing table updated');
						console.log('drawing table updated');
					})
				// log action
				updateLoggingTable(updateQuery, apiKey);
			}
		})
})

// INSERT Endpoint

app.post('/insert', (req, res) => {
	let table = req.body.table_name;
	let apiKey = req.body.api_key;
	let apiQuery = apiKeyQuery(apiKey);

	connection.query(apiQuery,
		(err, results, fields) => {
			// validate API key
			if (results.length == 0) {
				res.status(400).send('Bad API Key');
				console.log('bad API Key');
				return;
				// validate table value
			} else if (!(databaseTables.includes(table))) {
				res.status(400).send(`Invalid Table ${table}`);
				console.log(`Invalid Table ${table}`);
				return;
				// modify pole table
			} else if (table === 'pole') {
				let poleQuery = queries.insertPoleTable;
				let newStencil = req.body.table_value.pole_stencil;

				connection.query(poleQuery(newStencil),
					(err, results, fields) => {
						res.send('insert into pole table successful');
					});

				updateLoggingTable(poleQuery(newStencil), apiKey);
				console.log(`Insert ${newStencil} into pole table`)
				return;
			} else if (table === 'drawings') {
				let drawingQuery = queries.insertDrawingsTable;
				let drawingName = req.body.table_value.drawing_name;
				let drawingTitle = req.body.table_value.drawing_title;
				let lineId = req.body.table_value.line_id;

				connection.query(drawingQuery(drawingName, drawingTitle, lineId),
					(err, results, fields) => {
						res.send('insert into drawings table successful');
					})

				updateLoggingTable(drawingQuery(drawingName, drawingTitle, lineId), apiKey);
				console.log(`Insert drawing name: ${drawingName},
				drawing title: ${drawingTitle},
				line id: ${lineId} into drawing table`);

				return;
			} else if (table === 'line') {
				let lineQuery = queries.insertLineTable;
				let lineNumber = req.body.table_value.line_number;
				let lineName = req.body.table_value.line_name;
				let lineAbbreviation = req.body.table_value.line_abbreviation;

				connection.query(lineQuery(lineNumber, lineName, lineAbbreviation),
					(err, results, fields) => {
						res.send('insert into drawings table successful');
					});

				updateLoggingTable(lineQuery(lineNumber, lineName, lineAbbreviation), apiKey);
				console.log(`Insert line number: ${lineNumber}, line name: ${lineName}
				line abbreviation ${lineAbbreviation} into line table`);

				return;
			} else if (table === 'pole_drawings') {
				let poleDrawingsQuery = queries.insertPoleDrawingsTable;
				let poleId = req.body.table_value.pole_id;
				let drawingId = req.body.table_value.drawing_id;

				connection.query(poleDrawingsQuery(poleId, drawingId),
					(err, results, fields) =>{
						res.send('insert into pole_drawings table successful');
					});

				updateLoggingTable(poleDrawingsQuery(poleId, drawingId), apiKey);
				console.log(`Insert pole id: ${poleId}, drawing id: ${drawingId}
				into pole_drawings table`);

				return;
			}
		})
})