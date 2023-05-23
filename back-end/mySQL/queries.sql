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

SELECT *
FROM pole
JOIN pole_drawings ON pole.pole_id = pole_drawings.pole_id
JOIN drawings ON pole_drawings.drawing_id = drawings.drawing_id
WHERE pole_stencil = "EA-O 3/3";


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
    