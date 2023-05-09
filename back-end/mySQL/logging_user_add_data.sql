-- logging table sample data
INSERT INTO logging (date_time, action)
VALUES 
	((SELECT NOW()), "ADD DATA"),
    ((SELECT NOW()), "ADD DATA"),
    ((SELECT NOW()), "ADD DATA");

-- user_logging sample data
INSERT INTO user_logging (log_id, user_id)
VALUES
	(1, 1),
    (2, 2),
    (3, 3);

-- user table sample data
INSERT INTO user (user_first_name, user_last_name, user_email)
VALUES 
	("Eric", "K", "erick@gmail.com"),
    ("Zaya", "E", "ZayaE@gmail.com"),
    ("Lucas", "K", "LucasK@gmail.com");
    
-- api key sample data
INSERT INTO api_key (key_value, valid)
VALUES 
	("boithu2eeph9vaey1ahThep2eeYaeKaihoo8shoo", 0),
	("Iesh7ooTh3aegh3Faer7xeej1eaChie2Shiechae", 1),
	("caphie7chai2yaengooghiv7OuThiepie4kah2ku", 1),
	("shee9Quoim7AeN3gaiXa3xaec6aida0Ienoolioz", 1),
	("podeeYuagei0phiiGh4Vie2oegh8Bi4ahph3ohVi", 0),
	("uzae5ahNg4sah7aiqu5az7gei0Ogh1tahLohd9ie", 1),
	("thoh4chair1eQua3su5poaQuu0oovaipiuxo5pho", 1),
	("phaeKugeethai1roop4ieciohoa0ahZ6eeweLaik", 1),
	("ohyei0waigifahzee1zairie0eifailo0Oetai2b", 1),
	("ap1raeChootah6ieGei3reh7aiph2eengevu6Ahg", 1),
	("eifohNei0Ipooqu0eeTohai6yeiyi1shace0Ahji", 1),
	("mooBei3WooN5pae7Meenge4fee5daepai7Ahd7ru", 1),
	("ahp0ohfoophoo9eebu4ohghahPhaiVahshahWohw", 1),
	("Po8eiv7meiboopangoisooc2eijaed6lohthohNg", 1),
	("hah9Ul0thau0tiepe3aong0koomeim9Eemoh9Eef", 1),
	("Aecoo7thoizoopheingaiY2iechoalae7chohkei", 0),
	("pee1Raecae0eey6ziegh6wex4Hai0Oecoh0shaiz", 1),
	("aing2Keithoox1RohPhuh8shaf5aeji4PaevieCh", 0),
	("phaepiesahgh1kahng2gookoh1xahpahHeo8Geij", 0),
	("chi6xe6Ohj4ooDachohphu7choon8wieroNah3ho", 1);

INSERT INTO user_api_key (user_id, api_key_id)
VALUES
	(2, 1),
	(2, 2),
	(1, 3),
	(1, 4),
	(3, 5),
	(3, 6),
	(1, 7),
	(3, 8),
	(2, 9),
	(1, 10),
	(2, 11),
	(2, 12),
	(1, 13),
	(1, 14),
	(1, 15),
	(1, 16),
	(2, 17),
	(3, 18),
	(1, 19),
	(3, 20);