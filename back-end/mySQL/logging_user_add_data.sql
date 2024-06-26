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
INSERT INTO user (user_first_name, user_last_name, user_email, pass_salt, pass)
VALUES 
	("Eric", "K", "erick@gmail.com", "oeru3yu8uoVuXah", "8de785f47d8dcb62f6193c58c7f7844ff13bf78f591eb17ff2ed46d96b7dae0a"), -- pass = "TooTaix6vothei3una7d"
    ("Zaya", "E", "ZayaE@gmail.com", "re5eeF6aoshoogh", "69eeb344953c92a00d5688780ead58cf7e6e74b9a8f0ad6a024eeefee3b77156"), -- pass = "eepoum7ohCoh6Eiteubi"
    ("Lucas", "K", "LucasK@gmail.com", "woh7ieg1Loothae", "0a3d47499ed3654fadcf9a98bf3b12a1f41458e276d2c0444b7b058ca76c7e6d"), -- pass = "Eix0eig7Rohrai4eNg0u"
    ("New_User", "NA", "none", "bafo5yuetaa1Ana", "97faa5292cd816e109528c3a30d4bb699c5cf91398254240bf72cf52e67d1acc"); -- pass = "baiWahs6vahsien5Be0a"
/*
	password is a sha-256 hash for pass_salt + the password the user has entered. Plain text passwords are never stored
*/

-- api key sample data
INSERT INTO api_key (key_value, valid, permission)
VALUES 
	("boithu2eeph9vaey1ahThep2eeYaeKaihoo8shoo", 0, 4),
	("Iesh7ooTh3aegh3Faer7xeej1eaChie2Shiechae", 1, 4),
	("caphie7chai2yaengooghiv7OuThiepie4kah2ku", 1, 4),
	("shee9Quoim7AeN3gaiXa3xaec6aida0Ienoolioz", 1, 4),
	("podeeYuagei0phiiGh4Vie2oegh8Bi4ahph3ohVi", 0, 4),
	("uzae5ahNg4sah7aiqu5az7gei0Ogh1tahLohd9ie", 1, 4),
	("thoh4chair1eQua3su5poaQuu0oovaipiuxo5pho", 1, 4),
	("phaeKugeethai1roop4ieciohoa0ahZ6eeweLaik", 1, 4),
	("ohyei0waigifahzee1zairie0eifailo0Oetai2b", 1, 4),
	("ap1raeChootah6ieGei3reh7aiph2eengevu6Ahg", 1, 4),
	("eifohNei0Ipooqu0eeTohai6yeiyi1shace0Ahji", 1, 4),
	("mooBei3WooN5pae7Meenge4fee5daepai7Ahd7ru", 1, 4),
	("ahp0ohfoophoo9eebu4ohghahPhaiVahshahWohw", 1, 4),
	("Po8eiv7meiboopangoisooc2eijaed6lohthohNg", 1, 4),
	("hah9Ul0thau0tiepe3aong0koomeim9Eemoh9Eef", 1, 4),
	("Aecoo7thoizoopheingaiY2iechoalae7chohkei", 0, 4),
	("pee1Raecae0eey6ziegh6wex4Hai0Oecoh0shaiz", 1, 4),
	("aing2Keithoox1RohPhuh8shaf5aeji4PaevieCh", 0, 6),
	("phaepiesahgh1kahng2gookoh1xahpahHeo8Geij", 0, 6),
	("chi6xe6Ohj4ooDachohphu7choon8wieroNah3ho", 1, 7);

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