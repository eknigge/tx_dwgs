import requests

url = 'http://localhost:3000/insert'
data = {
    'api_key': 'phaepiesahgh1kahng2gookoh1xahpahHeo8Geij',
    'table_name': 'pole',
    'table_value': {
        'pole_stencil': 'even newer pole'
    }
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)