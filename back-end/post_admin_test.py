import requests

url = 'http://localhost:3000/admin'
data = {
    'query': 'TA-16',
    'api_key': 'caphie7chai2yaengooghiv7OuThiepie4kah2ku',
    'operation': 'delete'
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)