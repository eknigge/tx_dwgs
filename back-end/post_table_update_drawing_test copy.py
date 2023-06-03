import requests

url = 'http://localhost:3000/update_drawings'
data = {
    'api_key': 'Iesh7ooTh3aegh3Faer7xeej1eaChie2Shiechae',
    'table_name': 'drawings',
    'table_value': {
        'drawing_name_existing': 'TA-20',
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