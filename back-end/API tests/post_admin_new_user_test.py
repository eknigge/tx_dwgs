import requests

url = 'http://localhost:3000/adminNewUser'
data = {
    'api_key': 'chi6xe6Ohj4ooDachohphu7choon8wieroNah3ho',
    'first_name': 'new_user_1',
    'last_name': 'new_user_last',
    'user_email': 'new_user@mail.com',
    'password': 'new_user_password',
    'permission': 6
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)