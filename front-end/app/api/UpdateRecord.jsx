import { message } from 'antd'

export const UpdateRecord = async (apiKey, table, record) => {
  console.log('Update record: ' + record)
  try {
    const response = await fetch(`http://localhost:3000/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: apiKey,
        table_name: table,
        table_value: {

        }
      })
    })
    const res = await response.text()
    console.log('Response: ' + res)
    if (res === 'success') {
      message.success('Record deleted successfully.')
    } else if (res === 'Bad API Key') {
      message.error('Bad API Key')
    } else {
      message.warning(res)
    }
  } catch (error) {
    console.error('Error deleting data:', error)
    message.error('Error deleting record.')
  }
}
