import { message } from 'antd'

export const UpdateRecord = async (apiKey, table, record) => {
  console.log('Updating record: ', record)
  try {
    const response = await fetch(`http://localhost:3000/update_${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: apiKey,
        table_name: table,
        table_value: record
      })
    })
    const res = await response.text()
    console.log('Update Response: ' + res)
    if (res === `${table} table updated`) {
      message.success('Record updated successfully.')
    } else if (res === 'Bad API Key') {
      message.error('Bad API Key')
    } else {
      message.warning(res)
    }
  } catch (error) {
    console.error('Error updating record:', error)
    message.error('Error updating record.')
  }
}
