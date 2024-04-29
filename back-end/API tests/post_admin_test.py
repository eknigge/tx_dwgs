import requests

url = 'http://localhost:3000/admin'
data = {
    'query': 'CI 0/4',
    'api_key': 'chi6xe6Ohj4ooDachohphu7choon8wieroNah3ho',
    'operation': 'delete'
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)