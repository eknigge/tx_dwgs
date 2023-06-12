// Transmission Drawings by Pole Stencil
const poleQuery =
	function (input) {
		return `
		SELECT 
			drawing_name AS \`Dwg Name\`,
			drawing_title AS \`Title\`,
			revision_number AS \`Revision No.\`,
			revision_date AS \`Revision Date\`
		FROM pole
		JOIN pole_drawings ON pole.pole_id = pole_drawings.pole_id
		JOIN drawings ON pole_drawings.drawing_id = drawings.drawing_id
		WHERE pole_stencil = "${input}";
		`
	}

// Transmission Drawings by Line Number
const lineQuery =
	function (input) {
		return `
		SELECT 
			DISTINCT UPPER(drawing_name) AS \`Dwg Name\`,
			drawing_title AS \` Dwg Title\`
		FROM line
		JOIN drawings ON line.line_id = drawings.line_id
		JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
		JOIN pole ON pole_drawings.pole_id = pole.pole_id
		WHERE line_number = "${input}"
		ORDER BY \`Dwg Name\`;
		`
	}

// Transmission Poles by Drawing Number 
const dwgQuery =
	function (input) {
		return `
		SELECT 
			UPPER(pole_stencil) AS \`Pole Stencil\`
		FROM line
		JOIN drawings ON line.line_id = drawings.line_id
		JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
		JOIN pole ON pole_drawings.pole_id = pole.pole_id
		WHERE drawing_name = "${input}";
		`
	}

// Validate API key query
const apiKeyQuery =
	function (input) {
		return `
		SELECT valid FROM api_key
		JOIN user_api_key on api_key.api_key_id = user_api_key.api_key_id
		JOIN user ON user.user_id = user_api_key.user_id
		WHERE key_value = "${input}"; `
	}

// Delete pole by stencil 
const deletePole = function (input) {
	return `
		DELETE FROM pole
		WHERE pole_id IN 
		(SELECT * FROM 
			(SELECT pole_id FROM pole
			WHERE pole_stencil = "${input}") 
		tmpTable);`
}

// Delete drawing
const deleteDwg = function (input) {
	return `
	DELETE FROM drawings
	WHERE drawing_id IN 
		(SELECT * FROM 
			(SELECT drawing_id FROM drawings
			WHERE drawing_name = "${input}")
		tmpTable);`
}

// Delete Line
const deleteLine = function (input) {
	return `
	DELETE FROM line
	WHERE line_id IN
		(SELECT * FROM 
			(SELECT line_id FROM line
			WHERE line_number = "${input}")
		tmpTable);`
}

// Add logging event
const addLogEvent = function (action) {
	return `
	INSERT INTO logging (date_time, action)
	VALUES 
		((SELECT NOW()), "${action}");
	`
}

// Update user_logging table
const updateUserLogging = function (apiKey) {
	return `
	INSERT INTO user_logging(log_id, user_id)
	VALUES (
		(SELECT max(log_id) FROM logging),
		(SELECT user.user_id FROM api_key
			JOIN user_api_key on api_key.api_key_id = user_api_key.api_key_id
			JOIN user ON user.user_id = user_api_key.user_id
			WHERE key_value = "${apiKey}")
		);`
}

// get pole table
const getPoleTable = function () {
	return `
	SELECT * FROM pole;`
}

// get pole_drawings table
const getPoleDrawingsTable = function () {
	return `
	SELECT * FROM pole_drawings;`
}

// get line table 
const getLineTable = function () {
	return `
	SELECT * FROM line;`
}

// get drawings table
const getDrawingsTable = function () {
	return `
	SELECT drawing_id, drawing_name, drawing_title, revision_number, revision_date
	FROM drawings;`
}

// UPDATE pole_id
const updatePoleId = function (pole_id, pole_stencil) {
	return `
	UPDATE pole
	SET pole_stencil = "${pole_stencil}"
	WHERE pole_id = ${pole_id};`
}

// UPDATE drawings
const updateDrawings = function (drawingNameExisting, drawingNameNew,
	drawingTitle, revisionNumber, revisionDate) {
	return `
	UPDATE drawings
	SET 
		drawing_name = "${drawingNameNew}",
		drawing_title = "${drawingTitle}",
		revision_number = ${revisionNumber},
		revision_date = "${revisionDate}"
WHERE drawing_id = 
	(SELECT * FROM 
		(SELECT drawing_id FROM drawings
        WHERE drawing_name = "${drawingNameExisting}")
	tmpTable);
	`
}

// UPDATE line table
const updateLineTable = function (line_number_existing, line_number_new,
	line_name, line_abbreviation) {
	return `
	UPDATE line
	SET
	line_number = ${line_number_new},
		line_name = "${line_name}",
		line_abbreviation = "${line_abbreviation}"
	WHERE line_id =
		(SELECT * FROM
			(SELECT line_id FROM line
			WHERE line_number = ${line_number_existing})
		tmpTable);
	`
}



module.exports = {
	poleQuery, lineQuery, dwgQuery, apiKeyQuery, deletePole,
	deleteDwg, deleteLine, addLogEvent, updateUserLogging, getPoleTable, getPoleDrawingsTable,
	getLineTable, getDrawingsTable, updatePoleId, updateDrawings, updateLineTable
};