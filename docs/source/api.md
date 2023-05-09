# API

## Errors
We use conventional HTTP response codes to indicate the success or failure of an API request. The following table provides additional detail. 
| HTTP Status Code   | Code Summary                                                           |
|--------------------|------------------------------------------------------------------------|
| 200 - OK           | Everything worked as expected                                          |
| 400 - Bad Request  | The request was unacceptable often due to missing a required parameter |
| 500 - Server Error | Server side errors                                                     |


## Requests
### POST /admin
```
POST http://localhost:3000/admin
```
#### Body
Name | Type | Description
--- | --- | --- |
query | *string*| user text query
api_key | *string*| valid api key
operation | *string*| "delete", "insert" (incomplete), or "update" (incomplete). Only one modify operation permitted 

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
400 | Bad API key


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