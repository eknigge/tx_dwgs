# Getting Started
Installation instructions are provided for Windows, but may work in other environments. Consult software or package documentation for installing on other operating systems/environments. 

## Required Software
- Python 3+<br>
- Node.js 16+<br>
	- [MySQL 2](https://www.npmjs.com/package/mysql2)
	- [Express](https://expressjs.com/)
	- [nodemon (recommended)](https://www.npmjs.com/package/nodemon)
- Next.js 13+<br>
- MySQL Server 8+

## Sphinx Build
To execute a `sphinx-build` you must install sphinx, the MyST extension, and the sphinx book theme. 

Install Sphinx on Windows see [official docs](https://www.sphinx-doc.org/en/master/usage/installation.html) for other operating systems.

```
pip install -U sphinx
```

Install the MyST parser extension. [Official docs](https://myst-parser.readthedocs.io/en/latest/intro.html)

```
pip install myst-parser
```

Install the sphinx book theme.  [Official docs](https://sphinx-book-theme.readthedocs.io/en/stable/tutorials/get-started.html)

```
pip install sphinx-book-theme
```

Now you can run the build. Be sure to run this command in the `docs` directory and to not confuse the order of the source and build directories. 

```
python -m sphinx.cmd.build ./source/ ./build/
```

## Back-end
To set up the back-end, you will need to have MySQL server, Express.js, and MySQL 2 installed in the back-end folder using the node package manager. Consult the MySQL installation page that applies to your operating system and hardware configuration for proper guidance.

```
npm install [package_name]
```

Ensure that the MySQL server is launched and confirm the existence of the `mydb` database. If it is absent, proceed to create it and input the pole data. Execute the below SQL scripts in the MySQL IDE query window in the specified order. Executing them in a different order may cause problems in the database population.

1. [create_database](../../back-end/MySQL/create_database.sql)
2. [line_data_import](../../back-end/MySQL/line_data_import.sql)
3. [drawing_data_import](../../back-end/MySQL/drawing_data_import.sql)
4. [pole_data_import](../../back-end/MySQL/pole_data_import.sql)
5. [pole_details_data_import](../../back-end/MySQL/pole_details_data_import.sql)
6. [linking_table_data_import](../../back-end/MySQL/linking_table_data_import.sql)

From the command line start locate the back-end folder and start the Node.js server. 

```
node api.js
```

All systems should be operational now. To conduct test queries, please refer to the API page. If you are running it on your local machine, open your browser and visit `http://localhost:3000/` to view the outcome of a sample query.
