import requests

url = 'http://localhost:3000/tables'
data = {
    'table': 'line'
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)