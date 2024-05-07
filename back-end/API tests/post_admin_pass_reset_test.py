import requests

url = 'http://localhost:3000/adminPass'
data = {
    'api_key': 'chi6xe6Ohj4ooDachohphu7choon8wieroNah3ho',
    'user_name': 'erick@gmail.com',
    'password': 'new_password'
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)