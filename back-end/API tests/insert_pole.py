import requests

url = 'http://localhost:3000/insert'
data = {
    'api_key': 'caphie7chai2yaengooghiv7OuThiepie4kah2ku',
    'table_name': 'pole',
    'table_value': {
        'pole_stencil': 'even newer pole'
    }
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)