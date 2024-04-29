# API

(unique_identifiers)=
## Errors
We use conventional HTTP response codes to indicate the success or failure of an API request. The following table provides additional detail. 
| HTTP Status Code   | Code Summary                                                           |
|--------------------|------------------------------------------------------------------------|
| 200 - OK           | Everything worked as expected                                          |
| 400 - Bad Request  | The request was unacceptable often due to missing a required parameter |
| 500 - Server Error | Server side errors                                                     |

## Unique Identifiers
To modify a single record, choose a singular and distinct identifier. If two fields are identified, the system will automatically default to using the ID field.

Table | Unique Identifier 
--- | --- | 
pole | pole_id
pole_drawings | pole_drawings_id
line | line_id, line_number
drawings | drawing_id, drawing_name


## Requests
### POST /insert
This endpoint will insert information into the database tables and should be used for adding new data.

```
POST http://localhost:3000/insert
```

#### Body
Name | Type | Description
--- | --- | --- |
api_key | *string* | valid api key
table_name | *string* | name of table to modify "pole", "drawings", "line", or "pole_drawings"
table_value | *object* | key/values to update, must include unique identifier for each table type, see [Unique Identifiers table](unique_identifiers). See example below, note that **all** fields must be included for update.


**Pole Insert**
```
{
	"api_key": "string",
	"table_name": "pole",
	"table_value": {
		"pole_stencil": "string"
	}
}
```

**Line Insert**
```
{
	"api_key": "string",
	"table_name": "line",
	"table_value": {
		"line_number": "int",
		"line_name": "string",
		"line_abbreviation": "string"
	}
}
```
**Drawing Insert**
```
{
	"api_key": "string",
	"table_name": "drawings",
	"table_value": {
		"drawing_name": "string",
		"drawing_title": "string",
		"line_id": "int"
	}
}
```

**Pole Drawings Insert**
```
{
	"api_key": "string",
	"table_name": "pole_drawings",
	"table_value": {
		"pole_id": "int",
		"drawing_id": "int"
	}
}
```

#### Response
Code | Description 
--- | --- |
200 | OK
400 | Error. *Description to detail issue.*
### POST /update_line
```
POST http://localhost:3000/update_line
```

#### Body
Name | Type | Description
--- | --- | --- |
api_key | *string* | valid api key
table_name | *string* | name of table type to modify
table_value | *object* | key/values to update, must include unique identifier for each table type, see [Unique Identifiers table](unique_identifiers). See example below, note that **all** fields must be included for update.


```
{
	"api_key": "string",
	"table_name": "string",
	"table_value": {
		"line_number_existing": "string",
		"line_number_new": "string",
		"line_name": "string",
		"line_abbreviation": "string"
	}
}
```
#### Response
Code | Description 
--- | --- |
200 | OK
400 | Error. *Description to detail issue.*

### POST /update_drawing
```
POST http://localhost:3000/update_drawings
```

#### Body
Name | Type | Description
--- | --- | --- |
api_key | *string* | valid api key
table_name | *string* | drawings
table_value | *object* | key/values to update, must include unique identifier for each table type, see [Unique Identifiers table](unique_identifiers). See example below, note that **all** fields must be included for update.


```
{
	"api_key": "string",
	"table_name": "drawings",
	"table_value": {
		"drawing_name_existing": "string",
		"drawing_name_new": "string",
		"drawing_title": "string",
		"revision_number": "string/int",
		"revision_date": "string"
	}
}
```
#### Response
Code | Description 
--- | --- |
200 | OK
400 | Error. *Description to detail issue.*


### POST /update_pole
```
POST http://localhost:3000/update_pole
```

#### Body
Name | Type | Description
--- | --- | --- |
api_key | *string* | valid api key
table_name | *string* | pole
table_value | *object* | key/values to update, must include unique identifier for each table type, see [Unique Identifiers table](unique_identifiers)


```
{
	"api_key": "string",
	"table_name": "pole",
	"table_value": {
		"unique_identifier": "int",
		"updated_field": "string"
	}
}
```

#### Response
Code | Description 
--- | --- |
200 | OK
400 | Error. *Description to detail issue.*

### POST /tables
This request returns all the table information for a requested table in JSON format. Refer to the database documentation for a list of tables.
```
POST http://localhost:3000/tables
```


#### Body
Name | Type | Description
--- | --- | --- |
tables | *string* | name of table, accepts : "pole", "pole_drawings", "line", and "drawings"
```
{
	"table": "string",
}
```

#### Response
Code | Description 
--- | --- |
200 | OK
400 | Error. *Description to detail issue*

##### Pole Table 
Name | Type | Description
--- | --- | --- |
pole_id | *int*| table key
pole_stencil | *string*| unique, pole stencil / common name identifier 

The following example displays a limited portion of the data retrieved from the API. The actual result will have more than 5 elements.
```
[
	{
		"pole_id" : 10,
		"pole_stencil" : "CI 5/5"
	},
	{
		"pole_id" : 11,
		"pole_stencil" : "CI 0/I"
	},
	{
		"pole_id" : 12,
		"pole_stencil" : "CI 0/2"
	},
	{
		"pole_id" : 13,
		"pole_stencil" : "CI 0/3"
	},
	{
		"pole_id" : 14,
		"pole_stencil" : "CI 0/4"
	}
]
```

##### Pole Drawings Table 
Name | Type | Description
--- | --- | --- |
pole_drawings_id | *int* | table key
pole_id | *int* | pole table key
drawing_id | *int* | drawing table key

The following example displays a limited portion of the data retrieved from the API. The actual result will have more than 5 elements.
```
```


##### Line Table 
Name | Type | Description
--- | --- | --- |
line_id | *int* | line table key
line_number | *int* | line number, unique
line_name | *string* | common name for line
line_abbreviation | *string* | abbreviation for line_name / common name

The following example displays a limited portion of the data retrieved from the API. The actual result will have more than 5 elements.
```
[
	{
		"line_id" : 1,
		"line_number" : 101,
		"line_name" : "Stimson-Camano",
		"line_abbreviation" : "CI"
	},
	{
		"line_id" : 2,
		"line_number" : 102,
		"line_name" : "Lake Goodwin",
		"line_abbreviation" : "LG"
	},
	{
		"line_id" : 3,
		"line_number" : 103,
		"line_name" : "TULALIP",
		"line_abbreviation" : "WM"
	},
	{
		"line_id" : 4,
		"line_number" : 104,
		"line_name" : "Snohomish-East Marysville",
		"line_abbreviation" : "S-EM"
	},
	{
		"line_id" : 6,
		"line_number" : 106,
		"line_name" : "Snohomish-Delta",
		"line_abbreviation" : "S-D"
	}
]
```


##### Drawings Table 
Name | Type | Description
--- | --- | --- |
drawing_id | *int* | table key
drawing_name | *string* | name of drawing starting with a "T"
drawing_title | *string* | title of drawing
revision_number | *int* | positive integer of drawing revision

The following example displays a limited portion of the data retrieved from the API. The actual result will have more than 5 elements.

```
[
	{
		"drawing_id" : 5,
		"drawing_name" : "T3A-13C",
		"drawing_title" : "Original Plan and Profile Sheet 5",
		"revision_number" : "0",
		"revision_date" : "1966-01-07"
	},
	{
		"drawing_id" : 11,
		"drawing_name" : "TA-15",
		"drawing_title" : "Original Plan and Profile Sheet 11",
		"revision_number" : "1",
		"revision_date" : "2014-10-14"
	},
	{
		"drawing_id" : 12,
		"drawing_name" : "TA-16",
		"drawing_title" : "Original Plan and Profile Sheet 12",
		"revision_number" : "0",
		"revision_date" : "1966-01-07"
	},
	{
		"drawing_id" : 13,
		"drawing_name" : "TA-17",
		"drawing_title" : "Original Plan and Profile Sheet 13",
		"revision_number" : "0",
		"revision_date" : "1966-01-07"
	},
	{
		"drawing_id" : 14,
		"drawing_name" : "TA-18",
		"drawing_title" : "Original Plan and Profile Sheet 14",
		"revision_number" : "0",
		"revision_date" : "1966-01-07"
	}
]
```

### POST /admin
Supports the removal of a single user text query for a pole, drawing, or line item. Removal of multiple items will require multiple requests.

```
POST http://localhost:3000/admin
```
#### Body
Name | Type | Description
--- | --- | --- |
query | *string*| user text query. supports removal of pole, drawing, and line items.
api_key | *string*| valid api key
operation | *string*| "delete" is the only operation implemented
```
{
	"query": "string",
	"api_key": "string",
	"operation": "string 
}
```

#### Response
Code | Description 
--- | --- |
200 | Success
400 | Error. *Description to detail issue*


### POST /
```
POST http://localhost:3000/
```
#### Body
Name | Type | Description
--- | --- | --- |
query | *string*| user text query

```
{
	"query": "string"
}
```
#### Response 
Each response file represents query results as a JSON object array, with each object containing a column heading and its respective result. The following information provides a breakdown of the file contents.

##### Transmission Drawings by Pole Stencil
Name | Type 
--- | --- |
Dwg Name | *string*
Title | *string*
Revision No. | *int*
Revision Date | *string*

##### Transmission Drawings by Line Number
Name | Type 
--- | --- |
Pole Stencil | *string*


##### Transmission Poles by Line Number
Name | Type 
--- | --- |
Dwg Name | *string*
Title | *string*

## Sample Files
### Transmission Drawings by Pole Stencil
[Download](../../back-end/sample_json/pole_stencil_result.json) the sample file. 

```
[
	{
		"drawing_name" : "T169-8",
		"drawing_title" : "Structure EA-O 3/3 thru EA-O 3/10",
		"revision_number" : "2",
		"revision_date" : "2019-04-03"
	}
]
```
### Transmission Drawings by Line Number
[Download](../../back-end/sample_json/poles_by_line_number_result.json) the sample file. 

Response result truncated.
```
[
	{
		"pole_stencil" : "127835"
	},
	{
		"pole_stencil" : "131558"
	},
	{
		"pole_stencil" : "221954"
	},
	{
		"pole_stencil" : "222077"
	},
	{
		"pole_stencil" : "228912"
	},
	{
		"pole_stencil" : "229139"
	},
]

```
### Transmission Poles by Line Number
[Download](../../back-end/sample_json/poles_by_line_number_result.json) the sample file. 

Response result truncated.
```
[
	{
		"drawing_name" : "T120-1",
		"drawing_title" : "Structure Substa DE thru SK-C 0/3"
	},
	{
		"drawing_name" : "T120-10",
		"drawing_title" : "Structure SK-C 4/6 thru SK-C 4/10 Plan & Profile"
	},
	{
		"drawing_name" : "T120-2",
		"drawing_title" : "Structure SK-C 0/8 thru SK-C 0/10"
	},
	{
		"drawing_name" : "T120-3",
		"drawing_title" : "Structure SK-C 0/11 thru SK-C 1/4"
	},
	{
		"drawing_name" : "T120-4",
		"drawing_title" : "Structure SK-C 1/5 thru SK-C 1/8"
	},
]
```

### Transmission Poles by Drawing Number
[Download](../../back-end/sample_json/poles_by_drawing_number_result.json) the sample file. 

```
[
	{
		"pole_stencil" : "SK-C 2/3"
	},
	{
		"pole_stencil" : "SK-C 2/4"
	},
	{
		"pole_stencil" : "SK-C 2/5"
	},
	{
		"pole_stencil" : "SK-C 2/6"
	},
	{
		"pole_stencil" : "SK-C 2/7"
	},
	{
		"pole_stencil" : "SK-C 2/8"
	},
	{
		"pole_stencil" : "SC-BW 4/7"
	},
	{
		"pole_stencil" : "SC-BW 4/8"
	},
	{
		"pole_stencil" : "SC-BW 4/9"
	},
	{
		"pole_stencil" : "SC-BW 4/10"
	},
	{
		"pole_stencil" : "SC-BW 5/1"
	},
	{
		"pole_stencil" : "SC-BW 5/2"
	}
]
```

## Testing
Making API calls in Python is straightforward. If you are working on your local machine, ensure that the Node.js and MySQL server are active. Run one of the scripts below, modifying the query parameter to experiment with various outputs.

### POST /
This is a test endpoint that returns sample data from the database in JSON format. It can be used to validate that the back-end is functioning correctly and to test the request software.

```
import requests

url = 'http://localhost:3000'
data = {'query':'EA-O 3/3'}

response = requests.post(url, json=data)

print(response.json())
```
### POST/admin
```
import requests

url = 'http://localhost:3000'
data = {
    'query': 'CI 5/5',
    'api_key': 'caphie7chai2yaengooghiv7OuThiepie4kah2ku',
    'operation': 'delete'
	}

response = requests.post(url, json=data)

print(response.json())
```