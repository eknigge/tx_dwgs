import { message } from 'antd'

export const DeleteRecord = async (apiKey, record) => {
  console.log('Delete record: ' + record)
  try {
    const response = await fetch('http://localhost:3000/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: record,
        api_key: apiKey,
        operation: 'delete'
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
