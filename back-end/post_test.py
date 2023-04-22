import requests

url = 'http://localhost:3000'
data = {'query':'EA-O 3/3'}

response = requests.post(url, json=data)

print(response.json())