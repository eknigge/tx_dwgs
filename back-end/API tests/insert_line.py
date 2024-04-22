import requests

url = 'http://localhost:3000/insert'
data = {
    'api_key': 'caphie7chai2yaengooghiv7OuThiepie4kah2ku',
    'table_name': 'line',
    'table_value': {
        'line_number': '789',
        'line_name': 'Eric Knigge',
        'line_abbreviation': 'EK'
    }
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)