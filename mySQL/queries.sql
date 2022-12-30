SELECT drawing_name, drawing_title, revision_number, revision_date
FROM pole
JOIN pole_drawings ON pole.pole_id = pole_drawings.pole_id
JOIN drawings ON pole_drawings.drawing_id = drawings.drawing_id
WHERE pole_stencil = "EA-O 3/3";

SELECT DISTINCT drawing_name, drawing_title
FROM line
JOIN drawings ON line.line_id = drawings.line_id
JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
JOIN pole ON pole_drawings.pole_id = pole.pole_id
WHERE line_number = 169
ORDER BY drawing_name;

SELECT pole_stencil
FROM line
JOIN drawings ON line.line_id = drawings.line_id
JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
JOIN pole ON pole_drawings.pole_id = pole.pole_id
WHERE line_number = 169
ORDER BY pole_stencil;


SELECT pole_stencil
FROM line
JOIN drawings ON line.line_id = drawings.line_id
JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
JOIN pole ON pole_drawings.pole_id = pole.pole_id
WHERE drawing_name = "T169-1";

