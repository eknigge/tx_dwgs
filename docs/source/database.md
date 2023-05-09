# Database

The MySQL database uses the following ERD, which is a modified version of the original data/database. Some of the fields in the original data were not important to this tool so they were not imported into the final table. 

The table pole_details is independent of the pole table due to its distinct values and information, and lacks a one-to-one relationship. Although they can be associated, the way the data was acquired has resulted in their segregation within the database.

The logging, user, and API_key tables were included to document user actions and manage access when making changes to the database. Originally, the system was designed as a read-only model without these components.

![database_img](../../back-end/mySQL/ERD.png 'database_img')

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
link_table_data_import.sql | Import data for logging, user, and api key tables
logging_user_add_data.sql | Adds sample data to the logging, user, api_key, and linking tables. 
queries.sql | *Optional.* Run sample queries 