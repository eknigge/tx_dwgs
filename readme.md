# Overview
This project modernizes an older method of accessing engineering drawing information using Microsoft Access. The approach was to provide a simple, fast, and web-based solution that offers additional extensibility. This includes the addition of an administrator interface that allows for looking up logs, modifying and adding users, and making other edits to the database without having to write queries.

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

## Sphinx Documentation
The documentation for this project is not pre-compiled. This is done to save space and reduce clutter. Creating a local working copy is not difficult. Simply follow the scripts below to generate the build files, and then open the `index` file in your web browser to access the project documentation. A brief summary can be found in the `readme.md` file of the repository, but it is much more limited in scope compared to the full documentation.

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
### Required Software

To run the back-end, you will need to install the following software. All of the required software should be able to run on all operating systems and a variety of hardware configurations. 

- **MySQL**. Please refer to the MySQL installation page for installation instructions and software specific to your operating system.
- **Node.js**. The Node runtime environment is necessary to run other middleware software applications. You can use the package manager `npm` to install individual packages, or navigate to the back-end directory and run the command `npm install` to install all dependent packages listed in `packages.json` and `packages-lock`.
    - **Express.js**
    - **MySQL2**

### MySQL Database
Ensure that the MySQL server is launched and confirm the existence of the `mydb` database. If it is absent, proceed to create it and input the pole data. Execute the below SQL scripts in the MySQL IDE query window in the order below. Executing them in a different order may cause problems with creating the database. 

1. [create_database](../../back-end/MySQL/create_database.sql)
2. [line_data_import](../../back-end/MySQL/line_data_import.sql)
3. [drawing_data_import](../../back-end/MySQL/drawing_data_import.sql)
4. [pole_data_import](../../back-end/MySQL/pole_data_import.sql)
5. [pole_details_data_import](../../back-end/MySQL/pole_details_data_import.sql)
6. [linking_table_data_import](../../back-end/MySQL/linking_table_data_import.sql)

### Environment Variables
To start the API, you'll need to generate a .env file and place it in the back-end script directory. The file should contain the login information for your MySQL server.

```
HOST="localhost"
USER="username"
PASSWORD="password"
DATABASE_NAME="mydb"
```
### Start Middleware
From the command line, navigate to the back-end folder and start the Node.js server. This will initiate the mySQL server connection and expose the API that connects and serves data from the database.

```
node api.js
```

For development, you may use the nodemon server command which automatically restarts the system whenever any changes are made.
```
nodemon api.js
```

All systems should be operational now. To conduct test queries, please refer to the API page. If you are running it on your local machine, open your browser and visit `http://localhost:3000/` to view the outcome of a sample query.


## Front-end
To start the app in development mode, run the command below in the front-end directory. Choosing port 3001 helps prevent any conflicts with the default port of the back-end API.

```
npx next dev -p 3001
```

## View the Site
You can view the fully functional site in a web browser at `localhost:3001`.
