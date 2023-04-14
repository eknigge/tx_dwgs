# Getting Started
Installation instructions are provided for Windows, but may work in other environments. Consult software or package documentation for installing on other operating systems/environments. 

## Required Software
Python 3+<br>
Node.js 16+<br>
Next.js 13+<br>
mySQL 8+

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