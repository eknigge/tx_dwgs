# API

## Errors
We use conventional HTTP response codes to indicate the success or failure of an API request. The following table provides additional detail. 
| HTTP Status Code   | Code Summary                                                           |
|--------------------|------------------------------------------------------------------------|
| 200 - OK           | Everything worked as expected                                          |
| 400 - Bad Request  | The request was unacceptable often due to missing a required parameter |
| 500 - Server Error | Server side errors                                                     |


## Response Files
Each response file represents query results as a JSON object array, with each object containing a column heading and its respective result. The following information provides a breakdown of the file contents.

### Transmission Drawings by Pole Stencil
[Download](../../back-end/sample_json/pole_stencil_result.json) the sample file. 

#### Parameters
**drawing_name** *string* <br> &emsp; is the name of the drawing and typically starts with "T" followed by the line number, a dash, and then the drawing number
**drawing_title** *string* <br> &emsp; name of the drawing assigned by engineer and drafting departments
**revision_number** *int* <br> &emsp;the number of revisions for a drawing
**revision_date** *string* <br> &emsp; the date of the latest drawing revision

#### Response
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

#### Parameters
**pole_stencil** *string* <br> &emsp; pole stencil
#### Response
Response result has been truncated.
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
#### Parameters
**drawing_name** *string* <br> &emsp; is the name of the drawing and typically starts with "T" followed by the line number, a dash, and then the drawing number
**drawing_title** *string* <br> &emsp; name of the drawing assigned by engineer and drafting departments
#### Response
Response result has been truncated.
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
#### Parameters
**pole_stencil** *string* <br> &emsp; pole stencil
#### Response
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