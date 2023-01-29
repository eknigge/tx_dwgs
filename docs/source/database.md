# Database

The MySQL database uses the following ERD, which is a modified version of the original data/database. Some of the fields in the original data were not important to this tool so they were not imported into the final table. 
![database_img](../../mySQL/ERD.png 'database_img')

## Creation
The database can be created in MySQL, or other database software. The script files are contained in the MySQL folder and a brief description of each is given below. It is recommended to execute them in the order listed.

File | Description |
--- | --- |
create_database.sql | Creates database
line_data_import.sql | Import line table data
drawing_data_import.sql | Import drawing table data
pole_data_import.sql | Import pole table data
linking_table_data_import.sql | Import data to pole_drawings linking table
pole_details_data_import.sql | Import data for the pole_details table

## Queries
Queries that match existing functionality are shown in the queries.sql file.