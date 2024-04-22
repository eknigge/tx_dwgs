-- Transmission Drawings by Pole Stencil
SELECT drawing_name, drawing_title, revision_number, revision_date
FROM pole
JOIN pole_drawings ON pole.pole_id = pole_drawings.pole_id
JOIN drawings ON pole_drawings.drawing_id = drawings.drawing_id
WHERE pole_stencil = "EA-O 3/3";

-- Transmission Drawings by Line Number
SELECT DISTINCT UPPER(drawing_name) as `drawing_name`, drawing_title
FROM line
JOIN drawings ON line.line_id = drawings.line_id
WHERE line_number = 120
ORDER BY drawing_name;

-- Transmission Poles by Line Number 
SELECT pole_stencil
FROM line
JOIN drawings ON line.line_id = drawings.line_id
JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
JOIN pole ON pole_drawings.pole_id = pole.pole_id
WHERE line_number = 115
ORDER BY pole_stencil;

-- Transmission Poles by Drawing Number 
SELECT UPPER(pole_stencil) as `pole_stencil`
FROM line
JOIN drawings ON line.line_id = drawings.line_id
JOIN pole_drawings ON pole_drawings.drawing_id = drawings.drawing_id
JOIN pole ON pole_drawings.pole_id = pole.pole_id
WHERE drawing_name = "T120-6";

-- Delete Pole by Stencil
DELETE FROM pole
WHERE pole_id IN 
	(SELECT * FROM 
		(SELECT pole_id FROM pole
		WHERE pole_stencil = "CI 5/5") 
	tmpTable);

-- Delete Drawing
DELETE FROM drawings
WHERE drawing_id IN 
	(SELECT * FROM 
		(SELECT drawing_id FROM drawings
		WHERE drawing_name = "TA-15")
	tmpTable);
    
-- Delete Line
DELETE FROM line
WHERE line_id IN
	(SELECT * FROM 
		(SELECT line_id FROM line
		WHERE line_number = "102")
	tmpTable);

-- combine logging, user, and api key tables
select * from logging
join user_logging on user_logging.log_id = logging.log_id
join user on user_logging.user_id = user.user_id
join user_api_key on user_api_key.user_id = user.user_id
join api_key on api_key.api_key_id = user_api_key.api_key_id;

-- validate api key
SELECT * FROM api_key
JOIN user_api_key on api_key.api_key_id = user_api_key.api_key_id
JOIN user ON user.user_id = user_api_key.user_id
WHERE key_value = "API_KEY";

-- create logging event
INSERT INTO logging (date_time, action)
VALUES ((SELECT NOW()), "ACTION");

-- update user_logging table
INSERT INTO user_logging(log_id, user_id)
VALUES (
	(SELECT max(log_id) FROM logging),
    (SELECT user.user_id FROM api_key
		JOIN user_api_key on api_key.api_key_id = user_api_key.api_key_id
		JOIN user ON user.user_id = user_api_key.user_id
		WHERE key_value = "API_KEY")
    );

-- UPDATE drawings drawing_name
UPDATE drawings
SET drawing_name = "T-999"
WHERE drawing_id = 
	(SELECT * FROM
		(SELECT drawing_id FROM drawings
		WHERE drawing_name = "TA-16")
	tmpTable);

-- UPDATE drawings drawing_title
UPDATE drawings
SET drawing_title = "new title of drawing"
WHERE drawing_id = 
	(SELECT * FROM
		(SELECT drawing_id FROM drawings
		WHERE drawing_name = "TA-16")
	tmpTable);

-- UPDATE drawings revision_number
UPDATE drawings
SET revision_number = 10
WHERE drawing_id = 
	(SELECT * FROM
		(SELECT drawing_id FROM drawings
		WHERE drawing_name = "TA-16")
	tmpTable);  
    
-- UPDATE drawings revision_date
UPDATE drawings
SET revision_date = "2023-01-01"
WHERE drawing_id = 
	(SELECT * FROM
		(SELECT drawing_id FROM drawings
		WHERE drawing_name = "TA-16")
	tmpTable);      
    
-- update pole stencil
UPDATE pole
SET pole_stencil = "VALUE"
WHERE pole_id = 10;

-- update drawings all fields
UPDATE drawings
SET 
	drawing_name = "new name",
    drawing_title = "t-new-dwg",
    revision_number = 99,
    revision_date = (SELECT CURRENT_DATE())
WHERE drawing_id = 
	(SELECT * FROM 
		(SELECT drawing_id FROM drawings
        WHERE drawing_name = "new name")
	tmpTable);

-- update line table
UPDATE line
SET
	line_number = 103,
    line_name = "new_name",
    line_abbreviation = "NN"
WHERE line_id = 
	(SELECT * FROM
		(SELECT line_id FROM line
        WHERE line_number = 103)
	tmpTable);

-- INSERT into pole table
INSERT INTO pole (pole_id, pole_stencil)
VALUES (
	(SELECT * FROM (
		select pole_id + 1 AS new_id FROM pole
		ORDER BY pole_id DESC LIMIT 1
    ) tmpTable),
    ("NEW_STENCIL")
);

-- INSERT into line table
INSERT INTO line (line_id, line_number, line_name, line_abbreviation)
VALUES (
	((SELECT * FROM (
		SELECT line_id +1 AS new_line_id FROM LINE
		ORDER BY line_id DESC LIMIT 1) tmpTable)),
    (999),
    ("NEW_LINE_NAME"),
    ("ABBREVIATION")
);

-- INSERT into drawings table
INSERT INTO drawings (drawing_id, drawing_name,
	drawing_title, revision_number,
    revision_date, line_id)
VALUES (
	((SELECT * FROM (
		SELECT drawing_id +1 AS new_drawing_id FROM drawings
		ORDER BY drawing_id DESC LIMIT 1) tmpTable)),
    ("new drawing name"),
    ("t-999"),
    (0),
    (SELECT CURRENT_DATE()),
    (555)
);

-- INSERT into pole_drawings table
INSERT INTO pole_drawings (pole_drawings_id, pole_id, drawing_id)
VALUES (
	((SELECT * FROM (
		SELECT pole_drawings_id +1 AS new_pole_drawings_id FROM pole_drawings
		ORDER BY pole_drawings_id DESC LIMIT 1) tmpTable)),
    (99),
    (55)
);

-- test queries for INSERT 
select * from pole_drawings order by pole_drawings_id desc limit 20;
select * from pole order by pole_id desc limit 10;
select * from drawings order by drawing_id desc limit 10;
select * from line order by line_id desc limit 10;

select * from logging;
