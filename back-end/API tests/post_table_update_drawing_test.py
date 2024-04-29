import requests

url = 'http://localhost:3000/update_drawing'
data = {
    'api_key': 'phaepiesahgh1kahng2gookoh1xahpahHeo8Geij',
    'table_name': 'drawings',
    'table_value': {
        'drawing_name_existing': 'TA-15',
        'drawing_name_new': 'TA-NEW-DWG',
        'drawing_title': 'NEW TRANSMISSION DWG',
        'revision_number': '99',
        'revision_date': '2021-01-01'
    }
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)