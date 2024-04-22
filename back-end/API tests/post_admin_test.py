import requests

url = 'http://localhost:3000/admin'
data = {
    'query': 'CI 0/4',
    'api_key': 'caphie7chai2yaengooghiv7OuThiepie4kah2ku',
    'operation': 'delete'
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)