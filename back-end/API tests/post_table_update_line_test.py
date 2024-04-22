import requests

url = 'http://localhost:3000/update_line'
data = {
    'api_key': 'Iesh7ooTh3aegh3Faer7xeej1eaChie2Shiechae',
    'table_name': 'line',
    'table_value': {
        'line_number_existing': 101,
        'line_number_new': 99,
        'line_name': 'python named line',
        'line_abbreviation': 'pnl'
    }
}

response = requests.post(url, json=data)

#print(response.json())
print(response)
print(response.text)