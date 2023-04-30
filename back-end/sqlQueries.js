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

module.exports = { poleQuery, lineQuery, dwgQuery };