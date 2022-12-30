-- add data to pole table
INSERT INTO pole (pole_id, pole_stencil)
VALUES (10, "CI 5/5");

-- add data to line table
INSERT INTO line (line_id, line_number, line_name, line_abbreviation)
VALUES (1, 101, "Stimson-Camano", "CI");

-- add data to drawings table
INSERT INTO drawings (drawing_id, drawing_name, drawing_title, revision_number, revision_date, line_id)
VALUES 	(5, "T3A-13C", "Original Plan and Profile Sheet 5", 0, "1996-01-07", 1),
		(11, "TA-13C", "Original 11", 1, "2014-10-14", 1);

-- add data to pole_drawings
INSERT INTO pole_drawings (pole_drawings_id, pole_id, drawing_id)
VALUES (83, 10, 11);

