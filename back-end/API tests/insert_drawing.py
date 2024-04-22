import requests

url = 'http://localhost:3000/insert'
data = {
    'api_key': 'caphie7chai2yaengooghiv7OuThiepie4kah2ku',
    'table_name': 'drawings',
    'table_value': {
        'drawing_name': 'new drawing',
        'drawing_title': 'T-4321',
        'line_id': 50 
    }
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)