import requests

url = 'http://localhost:3000'
data = {'query':'TA-34'}

response = requests.post(url, json=data)

print(response)
print(response.json())