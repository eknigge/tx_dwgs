// Transmission Drawings by Pole Stencil
let poleStencilDefault = "EA-O 3/3";
const poleQuery = 
`
SELECT 
	drawing_name AS \`Dwg Name\`,
	drawing_title AS \`Title\`,
	revision_number AS \`Revision No.\`,
	revision_date AS \`Revision Date\`
FROM pole
JOIN pole_drawings ON pole.pole_id = pole_drawings.pole_id
JOIN drawings ON pole_drawings.drawing_id = drawings.drawing_id
WHERE pole_stencil = "${poleStencilDefault}";
`

// Transmission Drawings by Line Number
let lineNumberDefault = "120";
const lineQuery = 
`
SELECT 
	DISTINCT UPPER(drawing_name) AS \`Dwg Name\`,
	drawing_title AS \` Dwg Title\`
FROM line
JOIN drawings ON line.line_id = drawings.line_id
JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
JOIN pole ON pole_drawings.pole_id = pole.pole_id
WHERE line_number = ${lineNumberDefault}
ORDER BY drawing_name;
`

// Transmission Poles by Line Number 
/*
SELECT pole_stencil AS \`Pole Stencil\`
FROM line
JOIN drawings ON line.line_id = drawings.line_id
JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
JOIN pole ON pole_drawings.pole_id = pole.pole_id
WHERE line_number = 115
ORDER BY pole_stencil;
*/

// Transmission Poles by Drawing Number 
let dwgNameDefault = "T120-6";
const dwgQuery = 
`
SELECT 
	UPPER(pole_stencil) AS \`Pole Stencil\`
FROM line
JOIN drawings ON line.line_id = drawings.line_id
JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
JOIN pole ON pole_drawings.pole_id = pole.pole_id
WHERE drawing_name = "${dwgNameDefault}";
`

module.exports = {poleQuery, lineQuery, dwgQuery};