import requests

url = 'http://localhost:3000/update_pole'
data = {
    #'api_key': 'Iesh7ooTh3aegh3Faer7xeej1eaChie2Shiechae',
    'api_key': 'phaepiesahgh1kahng2gookoh1xahpahHeo8Geij',
    'table_name': 'pole',
    'table_value': {
        'pole_id': 12,
        'pole_stencil': "new stencil name"
    }
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)